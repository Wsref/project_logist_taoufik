import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Chart from '../../components/chart/Chart'
import ListTable from '../../components/listTable/ListTable'
import './truckDetails.scss'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase';
import {collection, query, where, doc, getDoc, getDocs} from "firebase/firestore";
import { tripColumns } from '../../dataTableSource'
import { DataGrid } from '@mui/x-data-grid';

const TruckDetails = ({ resource, details }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [trips, setTrips] = useState([]);
    const [fields, setFields] = useState(tripColumns)

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, resource, id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const docData = docSnap.data();
                setData(docData);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            let list = [];

            const tripQuery = query(
                    collection(db, "trips"), 
                    where("truck", "==", data.license)
            )

            const tripData = await getDocs(tripQuery);
            
            tripData.forEach((document) => { 
                let docData = document.data();

                docData.startDate = docData.startDate.toDate().toLocaleString();
                docData.endDate = docData.endDate.toDate().toLocaleString();

                list.push({id: document.id, ...docData})
            })

            setTrips(list)
        }

        fetchData();
    }, [data])



    const rows = [
            {
                id: 1143155,
                truck: "AE19FI2",
                originFacility: "Central Logistics",
                destinationFacility: "A1 Fulfillment",
                endDate: "7-28-2022 12:30:00",
                method: "7-31-2022 06:45:00",
                earnings: "$6000.00",
            },
            {
                id: 3756485,
                truck: "1J4GZ58S",
                originFacility: "Lakeview Shipping",
                destinationFacility: "Redwood Distribution",
                endDate: "8-14-2022 0:15:00",
                method: "8-14-2022 21:00:00",
                earnings: "$1000.00",
            },
            {
                id: 5635289,
                truck: "WBAAM334",
                originFacility: "Keystone Packaging",
                destinationFacility: "Ladybug Retail",
                endDate: "7-21-2022 08:00:00",
                method: "7-23-2022 12:45:00",
                earnings: "$5000.00",
            }
        ];


    return (
        <div className='truckDetails'>
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <div className="detail-card">
                            <div className="bio">
                                <img
                                    src="https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?cs=srgb&dl=pexels-photoscom-93398.jpg&fm=jpg"
                                    alt=""
                                    className="itemImg"
                                />
                                <div className="identifier">
                                    Truck:
                                    <h1 className="itemTitle">{id}</h1>
                                </div>
                            </div>
                            <div className="info">
                                {
                                    details.map(detail => (
                                        <div className="detailItem">
                                            <span className="itemKey">{detail.label}</span>
                                            <span className="itemValue">{data[detail.field]}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <Chart aspect={2} title="User Spending (Last 6 months)" />
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title">Last Trips</h1>
                    <DataGrid
                        rows={trips}
                        columns={fields}
                        autoHeight={true}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        className='datagrid'
                        getRowHeight={() => 'auto'}
                    />
                </div>
            </div>
        </div>
    )
}

export default TruckDetails