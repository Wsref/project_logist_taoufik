import React from 'react'
import './infoCard.scss'


const InfoCard = ({value, icon}) => {

    return (
        <div className='infoCard'>
            <div className="iconContainer">{icon}</div>
            <div className="attribute"><span>{value}</span></div>
        </div>
    )
}

export default InfoCard