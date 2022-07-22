import './new.scss'
import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'

const New = () => {
    return (
        <div className='new'>
            <Sidebar />
            <div className="newContainer">
                <Navbar />
            </div>
        </div>
    )
}

export default New