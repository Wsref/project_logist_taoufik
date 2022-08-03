import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Widget from '../../components/widget/Widget'
import './home.scss'
import ListTable from '../../components/listTable/ListTable'
import Chart from '../../components/chart/Chart'
import Featured from '../../components/featured/Featured'


const Home = () => {
    const rows = [
            {
                id: 1143155,
                truck: "AE19FI2",
                originFacility: "Central Logistics",
                destinationFacility: "A1 Fulfillment",
                startDate: "7-28-2022 12:30:00",
                endDate: "7-31-2022 06:45:00",
                earnings: "$6000.00",
            },
            {
                id: 3756485,
                truck: "1J4GZ58S",
                originFacility: "Lakeview Shipping",
                destinationFacility: "Redwood Distribution",
                startDate: "8-14-2022 0:15:00",
                endDate: "8-14-2022 21:00:00",
                earnings: "$1000.00",
            },
            {
                id: 5635289,
                truck: "WBAAM334",
                originFacility: "Keystone Packaging",
                destinationFacility: "Ladybug Retail",
                startDate: "7-21-2022 08:00:00",
                endDate: "7-23-2022 12:45:00",
                earnings: "$5000.00",
            }
        ];


    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Widget type="truck" />
                    <Widget type="trip" />
                    <Widget type="facility" />
                    <Widget type="earning" />
                </div>
                <div className="charts">
                    <Featured />
                    <Chart title="Total Revenue (Last 6 months)" aspect={1.75} />
                </div>
                <div className="listContainer">
                    <div className="listTitle">Latest Trips</div>
                    <ListTable data={rows} />
                </div>
            </div>
        </div>
    )
}

export default Home