import './newTrip.scss'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { addDoc, serverTimestamp, collection, Timestamp, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firebase';
import Sidebar from '../../components/sidebar/Sidebar' 
import Navbar from '../../components/navbar/Navbar'

const NewTrip = ({ resource, title }) => {

    const [file, setFile] = useState("")
    const [data, setData] = useState({});
    const [per, setPer] = useState(null);
    const navigate = useNavigate();

    const [truckData, setTruckData] = useState([])
    const [facilityData, setFacilityData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            let truckList = [];
            let facilityList = [];

            try {
                const querySnapshot = await getDocs(collection(db, "trucks"));
                querySnapshot.forEach((doc) => {
                    let docData = doc.data();

                    truckList.push({id: doc.id, ...docData});
                });
                
                setTruckData(truckList.map(truck => ({license: truck.license})));
            } catch (error) {
                console.log(error);
            }

            try {
                const querySnapshot = await getDocs(collection(db, "facilities"));
                querySnapshot.forEach((doc) => {
                    let docData = doc.data();

                    facilityList.push({id: doc.id, ...docData});
                });
                
                setFacilityData(facilityList.map(facility => ({facilityName: facility.facilityName})));
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [])


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
                            <div className="formInput">
                                <label>Truck</label>
                                <select name="truck" id="truck" onChange={handleInput}>
                                    <option value="none" selected disabled hidden>Select a Truck</option>
                                    {
                                        truckData.map((truck) => 
                                            (
                                                <option value={truck.license}>{truck.license}</option>
                                            )
                                        )
                                    }
                                </select>
                            </div>
                            <div className="formInput">
                                <label>Origin Facility</label>
                                <select name="originFacility" id="originFacility" onChange={handleInput}>
                                    <option value="none" selected disabled hidden>Select a Facility</option>
                                    {
                                        facilityData.map((facility) => 
                                            (
                                                <option value={facility.facilityName}>{facility.facilityName}</option>
                                            )
                                        )
                                    }
                                </select>
                            </div>
                            <div className="formInput">
                                <label>Destination Facility</label>
                                 <select name="destinationFacility" id="destinationFacility" onChange={handleInput}>
                                    <option value="none" selected disabled hidden>Select a Facility</option>
                                    {
                                        facilityData.map((facility) => 
                                            (
                                                <option value={facility.facilityName}>{facility.facilityName}</option>
                                            )
                                        )
                                    }
                                </select>
                            </div>
                            <div className="formInput">
                                <label>Start Date</label>
                                <input 
                                    id={"startDate"}
                                    type={"datetime-local"}
                                    onChange={handleInput} 
                                />
                            </div>
                            <div className="formInput">
                                <label>End Date</label>
                                <input 
                                    id={"endDate"}
                                    type={"datetime-local"}
                                    onChange={handleInput} 
                                />
                            </div>
                            <div className="formInput">
                                <label>Earnings</label>
                                <input 
                                    id={"earnings"}
                                    type={"text"} 
                                    placeholder={"1234.56"} 
                                    onChange={handleInput} 
                                />
                            </div>
                            <button disabled={per !== null && per < 100} type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewTrip