import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Chart from '../../components/chart/Chart'
import { useParams } from 'react-router-dom'
import { db } from '../../firebase';
import './facilityDetails.scss'
import {collection, query, where, doc, getDoc, getDocs} from "firebase/firestore";
import { tripColumns } from '../../dataTableSource'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';

const FacilityDetails = ({ resource, details }) => {
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

            const originQuery = query(
                    collection(db, "trips"), 
                    where("originFacility", "==", data.facilityName),
                    
            )

            const originData = await getDocs(originQuery);
            
            originData.forEach((document) => { 
                let originDocData = document.data();

                originDocData.startDate = originDocData.startDate.toDate().toLocaleString();
                originDocData.endDate = originDocData.endDate.toDate().toLocaleString();

                list.push({id: document.id, ...originDocData})
            })

            const destinationQuery = query(
                    collection(db, "trips"), 
                    where("destinationFacility", "==", data.facilityName),
                    
            )

            const destinationData = await getDocs(destinationQuery);
            
            destinationData.forEach((document) => { 
                let destinationDocData = document.data();

                destinationDocData.startDate = destinationDocData.startDate.toDate().toLocaleString();
                destinationDocData.endDate = destinationDocData.endDate.toDate().toLocaleString();

                list.push({id: document.id, ...destinationDocData})
            })

            setTrips(list)
        }

        fetchData();
    }, [data])

    return (
        <div className='facilityDetails'>
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <div className="detail-card">
                            <div className="bio">
                                <div className="resourceImg">
                                    <img src={'/warehouse.png'} alt="" className='itemImg'/>
                                </div>      
                                <div className="editBtn">
                                    <span>Edit</span><EditIcon className='icon'/>
                                </div>
                            </div>
                            <hr />
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

export default FacilityDetails