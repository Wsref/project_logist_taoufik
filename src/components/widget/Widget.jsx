import React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import "./widget.scss";

const Widget = ({ type }) => {

    let data;
    const amount = 100;

    switch(type) {
        case "truck":
            data = {
                title: "TRUCKS",
                isMoney: false,
                link: "See all trucks",
                icon: (
                    <LocalShippingOutlinedIcon
                        className="icon" 
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, .2)"
                        }}
                    />
                )
            }
            break;
        case "trip":
            data = {
                title: "TRIPS",
                isMoney: false,
                link: "See all trips",
                icon: (
                    <MapOutlinedIcon 
                        className="icon" 
                        style={{
                            color: "goldenrod",
                            backgroundColor: "rgba(218, 165, 32, .2)"
                        }}
                    />
                )
            }
            break;
        case "facility":
            data = {
                title: "FACILITIES",
                isMoney: false,
                link: "See all facilities",
                icon: (
                    <FactoryOutlinedIcon
                        className="icon" 
                        style={{
                            color: "green",
                            backgroundColor: "rgba(0, 128, 0, .2)"
                        }}
                    />
                )
            }
            break;
        case "earning":
            data = {
                title: "EARNINGS",
                isMoney: true,
                link: "See earnings details",
                icon: (
                    <MonetizationOnOutlinedIcon
                        className="icon" 
                        style={{
                            color: "purple",
                            backgroundColor: "rgba(128, 0, 128, .2)"
                        }}
                    />
                )
            }
            break;
        default:
            break;
    }

    return (
        <div className='widget'>
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "$"}{amount}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                        10%
                </div>
                {data.icon}
            </div>
        </div>
    )
}

export default Widget