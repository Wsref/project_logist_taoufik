import React from 'react'
import './infoCard.scss'

const InfoCard = ({resource, heading, data}) => {

    const resName = resource === "truck" ? data.license : data.facilityName;
    const resourceData1 = resource === "truck" ? `Driver: ${data.driver_name}` : data.address;
    const resourceData2 = resource === "truck" ? `Truck Capacity: ${data.capacity} lbs` : `${data.city}, ${data.facilityState} ${data.zipCode}`
    const resourceImg = resource === "truck" ? '/semi-truck.png' : '/warehouse.png';

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