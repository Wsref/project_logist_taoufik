import './newTrip.scss'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { addDoc, serverTimestamp, collection, Timestamp, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firebase';
import Sidebar from '../../components/sidebar/Sidebar' 
import Navbar from '../../components/navbar/Navbar'
import Select from '../../components/select/Select';

const NewTrip = ({ resource, title }) => {

    const [file, setFile] = useState("")
    const [data, setData] = useState({});
    const [per, setPer] = useState(null);
    const navigate = useNavigate();

    const [truckData, setTruckData] = useState([])
    const [facilityData, setFacilityData] = useState([])

    const [truckChoice, setTruckChoice] = useState("")
    const [facilityOne, setFacilityOne] = useState("");
    const [facilityTwo, setFacilityTwo] = useState("");


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
                
                setTruckData(truckList.map(truck => ({
                    license: truck.license,
                    driverName: truck.driver_name,   
                    capacity: truck.capacity
                })));
            } catch (error) {
                console.log(error);
            }

            try {
                const querySnapshot = await getDocs(collection(db, "facilities"));
                querySnapshot.forEach((doc) => {
                    let docData = doc.data();

                    facilityList.push({id: doc.id, ...docData});
                });
                
                setFacilityData(facilityList.map(facility => ({
                    facilityName: facility.facilityName, 
                    city: facility.city, 
                    facilityState: facility.facilityState, 
                    zipCode: facility.zipCode
                }
            )));
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [])


    const handleInput = (e) => {
        const id = e.target.id;
        const value = e.target.value;

        setData({ ...data, [id]: value })
        console.log(value)
    }

    useEffect(() => {
        setData({
            ...data, 
            truck: truckChoice, 
            originFacility: facilityOne, 
            destinationFacility: facilityTwo
        })
    }, [truckChoice, facilityOne, facilityTwo])


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

    const goBack = () => {
        navigate(`/trips`);
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
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label>Truck</label>
                            <Select 
                                    className="custom-select" 
                                    defaultText={"Select a Truck"} 
                                    id="secondTruck"
                                    setter={setTruckChoice}
                                    data={truckData}
                                    label="license"
                                    resource="trucks"

                                />
                            </div>
                            <div className="formInput">
                                <label>Origin Facility</label>
                                <Select 
                                        className="custom-select" 
                                        defaultText={"Select a Facility"}
                                        setter={setFacilityOne}
                                        data={facilityData}
                                        label="facilityName"
                                        resource="facilities"

                                    />
                            </div>
                            <div className="formInput">
                                <label>Destination Facility</label>
                                <Select 
                                    className="custom-select" 
                                    defaultText={"Select a Facility"} 
                                    setter={setFacilityTwo}
                                    data={facilityData}
                                    label="facilityName"
                                    resource="facilities"

                                />
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
                            <div className="btn-row">
                                <button onClick={goBack} className="cancelBtn">Cancel</button>
                                <button onClick={handleAdd} className='submitBtn'>Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewTrip