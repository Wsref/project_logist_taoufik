import './new.scss'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { doc, addDoc, serverTimestamp, collection, Timestamp } from "firebase/firestore"; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from '../../firebase';
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'

const New = ({ resource, title, inputs }) => {

    const [file, setFile] = useState("")
    const [data, setData] = useState({});
    const [per, setPer] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const uploadFile = () => {

            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, name);

            const uploadTask = uploadBytesResumable(storageRef, file);


            uploadTask.on(
                'state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    setPer(progress)
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                    }
                }, 
            (error) => {
                console.log(error)
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setData((prev) => ({...prev, img: downloadURL}));
                });
            }
            );
        }

        file && uploadFile();
    }, [file])

    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({ ...data, [id]: value })
        console.log(value)
    }

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            if (resource === "trips") {
                    data.earnings = parseInt(data.earnings);
                    data.startDate = Timestamp.fromDate(new Date(data.startDate));
                    data.endDate = Timestamp.fromDate(new Date(data.endDate));      
                }
            await addDoc(collection(db, resource), {
                ...data,
                timeStamp: serverTimestamp(),
            });
            navigate(-1)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='new'>
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img 
                            src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} 
                            alt="" 
                        />
                    </div>
                    <div className="right">
                        <form onSubmit={handleAdd}>
                            <div className="formInput">
                                Image <label htmlFor="file"><DriveFolderUploadOutlinedIcon className='icon'/></label>
                                <input type="file" id="file" onChange={e => setFile(e.target.files[0])} style={{display: "none"}}/>
                            </div>
                            {
                                inputs.map((input) => (
                                    <div className="formInput" key={input.id}>
                                        <label>{input.label}</label>
                                        <input 
                                            id={input.id}
                                            type={input.type} 
                                            placeholder={input.placeholder} 
                                            onChange={handleInput} 
                                        />
                                    </div>
                                ))
                            }
                            <button disabled={per !== null && per < 100} type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default New