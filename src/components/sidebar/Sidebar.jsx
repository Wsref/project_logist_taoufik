import React from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import './sidebar.scss'

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="top">
                <span className="logo">Logistics Manager</span>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <Link to="/" style={{textDecoration: "none"}}>
                        <li>
                            <DashboardIcon className="icon" />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <div className="title">RESOURCES</div>
                    <Link to="/trucks" style={{textDecoration: "none"}}>
                        <li>
                            <LocalShippingOutlinedIcon className="icon" />
                            <span>Trucks</span>
                        </li>
                    </Link>
                    <li>
                        <MapOutlinedIcon className="icon" />
                        <span>Trips</span>
                    </li>
                    <li>
                        <FactoryOutlinedIcon className="icon" />
                        <span>Facilities</span>
                    </li>
                    <div className="title">TOOLS</div>
                    <li>
                        <CalendarMonthOutlinedIcon className="icon" />
                        <span>Calendar</span>
                    </li>
                    <li>
                        <CompareArrowsOutlinedIcon className="icon" />
                        <span>Compare</span>
                    </li>
                    <li>
                        <AssessmentOutlinedIcon className="icon" />
                        <span>Generate Report</span>
                    </li>
                    <li>
                        <SettingsOutlinedIcon className="icon" />
                        <span>Settings</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <span>All Rights Reserved, 2022</span>
            </div>
        </div>
    )
}

export default Sidebar