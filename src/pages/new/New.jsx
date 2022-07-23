import './new.scss'
import React, { useState } from 'react'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'

const New = () => {

    const [file, setFile] = useState("")

    return (
        <div className='new'>
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add New Truck</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img 
                            src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} 
                            alt="" 
                        />
                    </div>
                    <div className="right">
                        <form action=''>
                            <div className="formInput">
                                Image <label htmlFor="file"><DriveFolderUploadOutlinedIcon className='icon'/></label>
                                <input type="file" id="file" onChange={e => setFile(e.target.files[0])} style={{display: "none"}}/>
                            </div>
                            <div className="formInput">
                                <label>License</label>
                                <input type="string" placeholder="ABCD123" />
                            </div>
                            <div className="formInput">
                                <label>Driver's Name</label>
                                <input type="string" placeholder="John Doe" />
                            </div>
                            <div className="formInput">
                                <label>Capacity</label>
                                <input type="number" placeholder="12345" />
                            </div>
                            <button>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default New