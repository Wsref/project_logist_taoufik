import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataTable from '../../components/dataTable/DataTable'
import './list.scss'

const List = ({ resource, title }) => {
  return (
    <div className='list'>
        <Sidebar />
        <div className="listContainer">
            <Navbar />
            <DataTable resource={resource} title={title} />
        </div>
    </div>
  )
}

export default List