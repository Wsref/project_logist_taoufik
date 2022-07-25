import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Widget from '../../components/widget/Widget'
import './home.scss'
import ListTable from '../../components/listTable/ListTable'
import Chart from '../../components/chart/Chart'
import Featured from '../../components/featured/Featured'

const Home = () => {
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
                <Chart title="Total Revenue (Last 6 months)" aspect={2} />
            </div>
            <div className="listContainer">
                <div className="listTitle">Latest Trips</div>
                <ListTable />
            </div>
        </div>
    </div>
  )
}

export default Home