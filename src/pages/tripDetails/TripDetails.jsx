import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Chart from '../../components/chart/Chart'
import './tripDetails.scss'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase';
import TabView from '../../components/tabView/TabView'
import {collection, query, where, getDocs, doc, getDoc} from "firebase/firestore";
import { truckDetails, tripDetails, facilityDetails } from "../../detailSource"
import Map from '../../components/map/Map'

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

    const rows = [
            {
                id: 1143155,
                truck: "AE19FI2",
                originFacility: "Central Logistics",
                destinationFacility: "A1 Fulfillment",
                startDate: "7-28-2022 12:30:00",
                endDate: "7-31-2022 06:45:00",
                earnings: "$6000.00",
            },
            {
                id: 3756485,
                truck: "1J4GZ58S",
                originFacility: "Lakeview Shipping",
                destinationFacility: "Redwood Distribution",
                startDate: "8-14-2022 0:15:00",
                endDate: "8-14-2022 21:00:00",
                earnings: "$1000.00",
            },
            {
                id: 5635289,
                truck: "WBAAM334",
                originFacility: "Keystone Packaging",
                destinationFacility: "Ladybug Retail",
                startDate: "7-21-2022 08:00:00",
                endDate: "7-23-2022 12:45:00",
                earnings: "$5000.00",
            }
        ];




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
            }
        }
        fetchData();
    }, [])


    const convertResource = (res) => {
        switch(res) {
            case "trucks":
                return "Truck";
            case "trips":
                return "Trip";
            case "facilities":
                return "Facility"
            default:
                return "";
        }
    }


    const truckInfo = (
                        <div className="info">
                            {
                                truckDetails.map(detail => (
                                    <div className="detailItem">
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
                    <div className="left">Left</div>
                    <div className="right">
                        <div className="right-top">
                            <Map />
                        </div>
                        <div className="right-bottom">
                            Right Bottom
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )


    // return (
    //     <div className='tripDetails'>
    //         <Sidebar />
    //         <div className="tripContainer">
    //             <Navbar />
    //             <div className="top">
    //                 <div className="left">
    //                     <div className="detail-card">
    //                         <div className="bio">
    //                             <img
    //                                 src="https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?cs=srgb&dl=pexels-photoscom-93398.jpg&fm=jpg"
    //                                 alt=""
    //                                 className="itemImg"
    //                             />
    //                             <div className="identifier">
    //                                 {convertResource(resource)}:
    //                                 <h1 className="itemTitle">{id}</h1>
    //                             </div>
    //                         </div>
    //                         <hr />
    //                         <div className="info">
    //                             {
    //                                 details.map(detail => (
    //                                     <div className="detailItem">
    //                                         <span className="itemKey">{detail.label}</span>
    //                                         <span className="itemValue">{data[detail.field]}</span>
    //                                     </div>
    //                                 ))
    //                             }
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="right">
    //                     <Chart aspect={2} title="User Spending (Last 6 months)" />
    //                 </div>
    //             </div>
    //             <div className="bottom">
    //                 <TabView 
    //                     className="tabSection"
    //                     title={"Details"}
    //                     tabs={
    //                         [
    //                             {name: "Truck", content: truckInfo},
    //                             {name: "Origin", content: "Hello Hello"},
    //                             {name: "Destination", content: "Hello Hello"}
    //                         ]
    //                     }
    //                 />
    //             </div>
    //         </div>
    //     </div>
    // )
}

export default TripDetails