import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Chart from '../../components/chart/Chart'
import ListTable from '../../components/listTable/ListTable'
import { truckRows, tripRows, facilityRows } from '../../dataTableSource';
import './singlePage.scss'
import { useParams } from 'react-router-dom'

const SinglePage = ({ resource, details }) => {
    const { id } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        switch(resource) {
        case "trucks":
            const truckData = truckRows.filter(truck => truck.id === (id * 1))[0]; 
            setData(truckData);
            break;
        case "trips":
            const tripData = tripRows.filter(trip => trip.id === (id * 1))[0];
            setData(tripData);
            break;
        case "facilities":
            const facilityData = facilityRows.filter(facility => facility.id === (id * 1))[0]
            setData(facilityData);
            break;
        default: 
            break; 
    }
    }, [])

    return (
        <div className='singlePage'>
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <div className="editButton">Edit</div>
                            <h1 className="title">Information</h1>
                            <div className="item">
                                <div className="portrait-view">
                                    <img
                                        src="https://images.pexels.com/photos/93398/pexels-photo-93398.jpeg?cs=srgb&dl=pexels-photoscom-93398.jpg&fm=jpg"
                                        alt=""
                                        className="itemImg"
                                    />
                                </div>
                                <div className="details">
                                    <h1 className="itemTitle">{}</h1>
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
                        <Chart aspect={2 / 1} title="User Spending (Last 6 months)" />
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title">Last Transactions</h1>
                    <ListTable />
                </div>
            </div>
        </div>
    )
}

export default SinglePage