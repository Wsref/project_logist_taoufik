import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataTable from '../../components/dataTable/DataTable'
import DataTableHistory from '../../components/dataTableHistory/DataTableHistory'
import './list.scss'

const List = ({ resource, title, history }) => {
    return (
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                    <Navbar />
                <div className="container">
                    {
                        !history ? 
                        <DataTable resource={resource} title={title} />
                        :
                        <DataTableHistory/>
                    }
                </div>
            </div>
        </div>
    )
}

export default List