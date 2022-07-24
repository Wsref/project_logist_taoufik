import './dataTable.scss'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { 
    truckColumns, 
    truckRows, 
    tripColumns, 
    tripRows, 
    facilityColumns, 
    facilityRows 
} from '../../dataTableSource';

const DataTable = ({ resource, title }) => {

    const [data, setData] = useState(truckRows)
    const [fields, setFields] = useState(truckColumns)

    useEffect(() => {
        switch(resource) {
        case "trucks":
            setData(truckRows);
            setFields(truckColumns);
            break;
        case "facilities":
            setData(facilityRows);
            setFields(facilityColumns);
            break;
        case "trips":
            setData(tripRows);
            setFields(tripColumns);
            break;
        default:
            break;
    }
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
                        <Link to={`/${resource}/${params.row.id}`} style={{textDecoration: "none"}}>
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