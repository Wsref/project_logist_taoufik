import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Chart from '../../components/chart/Chart'
import './tripDetails.scss'
import { Navigate, useParams } from 'react-router-dom'
import { db } from '../../firebase';
import TabView from '../../components/tabView/TabView'
import {collection, query, where, getDocs, doc, getDoc} from "firebase/firestore";
import { truckDetails, tripDetails, facilityDetails } from "../../detailSource"
import Map from '../../components/map/Map'
import CustomCalendar from '../../components/customCalendar/CustomCalendar'
import InfoCard from '../../components/infoCard/InfoCard'
import DateCard from '../../components/dateCard/DateCard'

const TripDetails = ({ resource, details }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [truckData, setTruckData] = useState({
        driver_name: "John Doe",
        capacity: 24000,
        license: "ABCD123",
        registration: "valid"
    })
    const [originFacilityData, setOriginFacilityData] = useState([]); 
    const [destinationFacilityData, setDestinationFacilityData] = useState([]); 

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, resource, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const docData = docSnap.data();

                if (resource === "trips") {
                    docData.startDate = docData.startDate.toDate().toLocaleString();
                    docData.endDate = docData.endDate.toDate().toLocaleString();             
                }
                setData(docData);
            } else {
                return <Navigate to="/404"/>
            }
        }
        fetchData();
    }, [])

    const truckInfo = (
                        <div className="info">
                            {
                                truckDetails.map(detail => (
                                    <div className="detailItem" key={detail.id}>
                                        <span className="itemKey">{detail.label}: </span>
                                        <span className="itemValue">{truckData[detail.field]}</span>
                                    </div>
                                ))
                            }
                        </div>
                    )


    return (
        <div className="tripDetails">
            <Sidebar />
            <div className="tripContainer">
                <Navbar />
                <div className="tripView">
                    <div className="left">
                        <div className="left-top">
                            <div className="tripSummary">
                                <div className="path">
                                    <div className="facility originFacility">{data.originFacility}</div>
                                    <span>to</span>
                                    <div className="facility originFacility">{data.destinationFacility}</div>
                                </div>
                                <div className="dates">
                                    <div className="date startDate">{data.startDate}</div>
                                    <span>to</span>
                                    <div className="date endDate">{data.endDate}</div>
                                </div>
                                <div className="summary">
                                    {`26.3 hours, $${data.earnings}`}
                                </div>
                            </div>
                            <hr />
                        </div>
                        
                        <div className="left-bottom">
                            <InfoCard resource="truck" heading="Truck" />
                            <InfoCard resource="facility" heading="Origin Facility"/>
                            <InfoCard resource="facility" heading="Destination Facility"/>
                        </div>
                    </div>
                    <div className="right">
                        <div className="right-top">
                            <Map />
                        </div>
                        <div className="right-bottom">
                            <CustomCalendar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripDetails;