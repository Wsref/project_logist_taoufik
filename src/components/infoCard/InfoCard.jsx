import React, { useState } from 'react'
import './infoCard.scss'

const InfoCard = ({resource, heading}) => {
    const [data, setData] = useState([]);

    const resName = resource === "truck" ? "ABCD123" : "Central Logistics";
    const resourceData1 = resource === "truck" ? "Driver: Barbara Phillips" : "123 Sesame Street";
    const resourceData2 = resource === "truck" ? "Truck Capacity: 35000 lbs" : "New York, NY 12345"
    const resourceImg = resource === "truck" ? '/semi-truck.jpg' : '/warehouse.jpg';

    return (
        <div className='cardContainer'>
            <h2 className='header'>{heading}</h2>
            <div className="card-body">
                <div className="card-left">
                    <div className="information">
                        <div className="resourceTitle">{resName}</div>
                        <div className="data">
                            <div className="resourceData1">{resourceData1}</div>
                            <div className="resourceData2">{resourceData2}</div>
                        </div>
                    </div>
                </div>
                <div className="card-right">
                    <img src={resourceImg} alt=""/>
                </div>
            </div>
        </div>
    )
}

export default InfoCard