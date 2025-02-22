import './dataTableHistory.scss'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { 
    tripColumnsHist
} from '../../dataTableSource';
import { AppContext } from '../../App';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const DataTableHistory = () => {
    
    const navigate = useNavigate();
    const { tripData } = useContext(AppContext);
    const [data, setData] = useState([]);
    const [fields, setFields] = useState(tripColumnsHist);

    const title = "History"
    const resource = "trips"

    const [datefilter, setDatefilter] = useState(null)

    useEffect(() => {

        // taoufik test
        // let date = new Date(); 
        // let newTime = new Date(date).setHours(0, 0, 0, 0);
        // date.setTime(newTime);
        // date = date.toLocaleString();
        // console.log("v ",date); 

        setFields(tripColumnsHist);


        const arrToSort = [...tripData]
        const sortedTrips = arrToSort.sort((a, b) =>  b.startDate - a.startDate);

        const tripsData = sortedTrips.map(trip => {return {
            ...trip, 
            startDate: new Date(trip.startDate).toLocaleString(),
            endDate: new Date(trip.endDate).toLocaleString()
        }})
        
        let currentDate = new Date();
        let currentDatesetHour = new Date(currentDate).setHours(0,0,0,0)
        currentDate.setTime(currentDatesetHour)
        currentDate = currentDate.toLocaleString()

        return setData(tripsData.filter(item => item.startDate < currentDate));
        
    }, [])

    const handleInput = (e) => {
        const valu = e.target.value;

        let newval = new Date(valu)
        let hourval = new Date(newval).setHours(23,59,59,0)
        newval.setTime(hourval)
        newval = newval.toLocaleString()

        setDatefilter(newval)

        // if(datefilter != null)
        //     console.log("handlin ",datefilter)
    }

    const filterme = () => {

        if(datefilter != null){
            const arrToSort = [...tripData]
            const sortedTrips = arrToSort.sort((a, b) =>  b.startDate - a.startDate);
    
            const tripsData = sortedTrips.map(trip => {return {
                ...trip, 
                startDate: new Date(trip.startDate).toLocaleString(),
                endDate: new Date(trip.endDate).toLocaleString()
            }})

            let currentDate = new Date();
            let currentDatesetHour = new Date(currentDate).setHours(23,59,59,0)
            currentDate.setTime(currentDatesetHour)
            currentDate = currentDate.toLocaleString()

            setData(tripsData.filter(item => (item.startDate <= currentDate) && (item.startDate <= datefilter ) ));
        }
            
    }

    return (
        <div className='dataTableh'>
            <div className="datatableTitle">
                {title}
                <div>
                    <input 
                        id={"startDate"}
                        type={"datetime-local"}
                        className="inpdate"
                        onChange={handleInput} 
                    />

                    <span> </span><FilterAltIcon className='iconh' onClick={() => filterme() }/>
                    
                </div>

                

                <Link to={`/${resource}`} style={{textDecoration: "none"}} className="linkhist">
                    <ArrowBackIcon/>
                </Link> 
            </div>
            <DataGrid
                rows={data}
                columns={fields}
                autoHeight={true}
                pageSize={6}
                rowsPerPageOptions={[6]}
                checkboxSelection
                className='datagrid'
                getRowHeight={() => 'auto'}
            />
        </div>
    )
}

export default DataTableHistory