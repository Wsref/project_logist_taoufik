import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Chart from '../../components/chart/Chart'
import './truckDetails.scss'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase';
import {collection, query, where, doc, getDoc, getDocs} from "firebase/firestore";
import { tripColumns } from '../../dataTableSource'
import { DataGrid } from '@mui/x-data-grid';
import InfoCard from '../../components/infoCard/InfoCard'
import PersonIcon from '@mui/icons-material/Person';
import ScaleIcon from '@mui/icons-material/Scale';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

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
                                <div className="infoGroup">
                                    <label>License</label>
                                    <InfoCard icon={<LocalShippingIcon className="icon" />} value={data.license} />
                                </div>
                                <div className="infoGroup">
                                    <label>Driver</label>
                                    <InfoCard icon={<PersonIcon className="icon" />} value={data.driver_name} />
                                </div>
                                <div className="infoGroup">
                                    <label>Capacity</label>
                                    <InfoCard icon={<ScaleIcon className="icon" />} value={data.capacity} />
                                </div>
                            </div>

                            {
                            // <div className="bio">
                            //     <img
                            //         src="https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?cs=srgb&dl=pexels-photoscom-93398.jpg&fm=jpg"
                            //         alt=""
                            //         className="itemImg"
                            //     />
                            //     <div className="identifier">
                            //         Truck:
                            //         <h1 className="itemTitle">{id}</h1>
                            //     </div>
                            // </div>
                            // <div className="info">
                            //     {
                            //         details.map(detail => (
                            //             <div className="detailItem">
                            //                 <span className="itemKey">{detail.label}</span>
                            //                 <span className="itemValue">{data[detail.field]}</span>
                            //             </div>
                            //         ))
                            //     }
                            // </div>
                            }
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