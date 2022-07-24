import React from 'react';
import { Link } from 'react-router-dom'
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
                link: "All trucks",
                url: "/trucks",
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
                link: "All trips",
                url: "/trips",
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
                link: "All facilities",
                url: '/facilities',
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
                link: "All earnings",
                url: "",
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
                <Link to={data.url} style={{textDecoration: "none"}}>
                    <span className="link">{data.link}</span>
                </Link>
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