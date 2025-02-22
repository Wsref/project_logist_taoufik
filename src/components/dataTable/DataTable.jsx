import './dataTable.scss'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { 
    truckColumns, 
    tripColumns, 
    facilityColumns, 
} from '../../dataTableSource';
import { AppContext } from '../../App';
import {doc, deleteDoc, collection, onSnapshot, query, where,serverTimestamp} from 'firebase/firestore';
import { db } from '../../firebase';

const DataTable = ({ resource, title}) => {
    
    const navigate = useNavigate();
    const { truckData, facilityData, tripData } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [fields, setFields] = useState(truckColumns);
    const [ishist, setIshist] = useState(null);

    useEffect(() => {
        switch(resource) {
            case "trucks":
                setFields(truckColumns);
                
                break;
            case "facilities":
                setFields(facilityColumns);
                
                break;
            case "trips":
                setFields(tripColumns);
                
                break;
            default:
                break;
        }

        if (resource === "trucks") {
            setIshist(null);
            return setData(truckData);
        } else if (resource === "facilities") {
            setIshist(null);
            return setData(facilityData)
        } else if (resource === "trips") {
            setIshist(1);

            const arrToSort = [...tripData]
            const sortedTrips = arrToSort.sort((a, b) =>  a.startDate - b.startDate);

            const tripsData = sortedTrips.map(trip => {return {
                ...trip, 
                startDate: new Date(trip.startDate).toLocaleString(),
                endDate: new Date(trip.endDate).toLocaleString()
            }})
            
            let currentDate = new Date();
            let currentDatesetHour = new Date(currentDate).setHours(0,0,0,0)
            currentDate.setTime(currentDatesetHour)
            currentDate = currentDate.toLocaleString()
            // test
            // if(tripsData[0]){
            //     console.log(tripsData[0].startDate)
            //     console.log(currentDate)
            //     console.log(tripsData[0].startDate > currentDate)
            // }


            return setData(tripsData.filter(item => item.startDate >= currentDate));
        }
    }, [resource])

    const handleDelete = (id) => {
        // doc, deleteDoc
        const docref = doc(db,resource,id);
        deleteDoc(docref)
        .then(() => {
            setData(data.filter(item => item.id !== id));
            // navigate(`/`);
        })
    }

    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/${resource}/${params.row.id}`} style={{textDecoration: "none", flex: 2}}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div className="deleteButton" onClick={() => {if (window.confirm('Sure you want to delete this one?')) handleDelete(params.row.id)} }>Delete</div>
                    </div>
                )
            }
        }
    ]

    return (
        <div className='dataTable'>
            <div className="datatableTitle">
                {title}

                {
                    ishist &&
                    <Link to={`/${resource}/history`} style={{textDecoration: "none"}} className="link2">
                        History
                    </Link> 
                }
                <Link to={`/${resource}/new`} style={{textDecoration: "none"}} className="link">
                    Add New
                </Link> 
            </div>
            <DataGrid
                rows={data}
                columns={fields.concat(actionColumn)}
                autoHeight={true}
                pageSize={6}
                rowsPerPageOptions={[6]}
                checkboxSelection
                className='datagrid'
                getRowHeight={() => 'auto'}
            />
        </div>
    )
}

export default DataTable