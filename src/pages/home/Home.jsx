import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Widget from '../../components/widget/Widget'
import './home.scss'
import ListTable from '../../components/listTable/ListTable'

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
                Chart
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