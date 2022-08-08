import './dataTable.scss'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { 
    truckColumns, 
    tripColumns, 
    facilityColumns, 
} from '../../dataTableSource';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

const DataTable = ({ resource, title }) => {

    const [data, setData] = useState([]);
    const [fields, setFields] = useState(truckColumns)

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

        const fetchData = async () => {
            let list = [];

            try {
                const querySnapshot = await getDocs(collection(db, resource));
                querySnapshot.forEach((doc) => {
                    let docData = doc.data();

                    if (resource === "trips") {
                        docData.startDate = docData.startDate.toDate().toLocaleString();
                        docData.endDate = docData.endDate.toDate().toLocaleString();
                    }

                    list.push({id: doc.id, ...docData});
                });
                
                setData(list);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [resource])

    const handleDelete = (id) => {
        setData(data.filter(item => item.id !== id));
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
                        <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Delete</div>
                    </div>
                )
            }
        }
    ]

    return (
        <div className='dataTable'>
            <div className="datatableTitle">
                {title}
                <Link to={`/${resource}/new`} style={{textDecoration: "none"}} className="link">
                    Add New
                </Link> 
            </div>
            <DataGrid
                rows={data}
                columns={fields.concat(actionColumn)}
                autoHeight={true}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                className='datagrid'
                getRowHeight={() => 'auto'}
            />
        </div>
    )
}

export default DataTable