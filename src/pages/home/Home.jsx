import React, { useContext, useEffect, useState} from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Widget from '../../components/widget/Widget'
import './home.scss'
import Chart from '../../components/chart/Chart'
import Featured from '../../components/featured/Featured'
import { tripColumns } from '../../dataTableSource'
import { DataGrid } from '@mui/x-data-grid';
import { db } from '../../firebase';
import {collection, getDocs} from "firebase/firestore";
import { AppContext } from '../../App'


const Home = () => {
    const [fields, setFields] = useState(tripColumns)
    const [data, setData] = useState([]);
    const { tripData } = useContext(AppContext)

    useEffect(() => {

        const fetchData = async () => {
            let list = [];

            try {
                const querySnapshot = await getDocs(collection(db, "trips"));
                querySnapshot.forEach((doc) => {
                    let docData = doc.data();

                    docData.startDate = docData.startDate.toDate()
                    docData.endDate = docData.endDate.toDate().toLocaleString();
                    

                    list.push({id: doc.id, ...docData});
                });
                
                list.sort((a,b) => b.startDate - a.startDate)

                list.forEach((document) => { 
                    document.startDate = document.startDate.toLocaleString();
                })


                setData(list.slice(0,5));
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [])



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
                    <Chart title="Total Revenue (Last 6 months)" aspect={1.75} tripsData={tripData} />
                </div>
                <div className="listContainer">
                    <div className="listTitle">Latest Trips</div>
                    <DataGrid
                        rows={data}
                        columns={fields}
                        autoHeight={true}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        className='datagrid'
                        getRowHeight={() => 'auto'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home