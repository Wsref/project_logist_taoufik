import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Chart from '../../components/chart/Chart'
import './truckDetails.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { tripColumns } from '../../dataTableSource'
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { AppContext } from '../../App'
 
const TruckDetails = ({ details }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [trips, setTrips] = useState([]);
    const [fields] = useState(tripColumns)
    const { truckData, tripData } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        const idResults = truckData.filter(truck => truck.id === id);

        if (idResults.length > 0) {
            setData(idResults[0]);
        } else {
            navigate("/404")
        }
    }, [])

    useEffect(() => {
        const truckTrips = tripData.filter(trip => trip.truck === data.license);
        setTrips(truckTrips);
    }, [data, tripData])

    return (
        <div className='truckDetails'>
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <div className="detail-card">
                            <div className="bio">
                                <div className="resourceImg">
                                    <img src={'/semi-truck.png'} alt="" className='itemImg'/>
                                </div>      
                                <div className="editBtn">
                                    <span>Edit</span><EditIcon className='icon'/>
                                </div>
                            </div>
                            <hr />
                            <div className="info">
                                {
                                    details.map(detail => (
                                        <div className="detailItem" key={detail.id}>
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