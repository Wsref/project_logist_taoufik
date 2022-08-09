import React, { useContext, useEffect, useState } from 'react'
import './featured.scss'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { CircularProgressbar } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { AppContext } from '../../App';

const Featured = () => {
    const { tripData } = useContext(AppContext)
    const [targetRevenue, setTargetRevenue] = useState(20000);
    const [thisMonthRevenue, setThisMonthRevenue] = useState(0);
    const [lastMonthRevenue, setLastMonthRevenue] = useState(0);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const today = new Date();
        const lastMonthToDate = new Date(new Date().setMonth(today.getMonth() - 1));
        const previousMonth = new Date(new Date().setMonth(today.getMonth() - 2));

        const thisMonthTrips = tripData.filter((trip) => ((trip.timeStamp.seconds * 1000 <= today.getTime()) && (trip.timeStamp.seconds * 1000 > lastMonthToDate.getTime())));
        const previousMonthTrips = tripData.filter((trip) => (trip.timeStamp.seconds * 1000 <= lastMonthToDate.getTime()) && (trip.timeStamp.seconds * 1000 > previousMonth.getTime()));

        const thisMonthEarnings = thisMonthTrips.map(trip => trip.earnings).reduce((previousVal, currentVal) => previousVal + currentVal, 0);
        const previousMonthEarnings = previousMonthTrips.map(trip => trip.earnings).reduce((previousVal, currentVal) => previousVal + currentVal, 0);

        setThisMonthRevenue(thisMonthEarnings);
        setLastMonthRevenue(previousMonthEarnings);
        setPercent((thisMonthEarnings / targetRevenue) * 100);
    }, [])


    return (
        <div className="featured">
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <MoreVertOutlinedIcon fontSize='small'/>
            </div>
            <div className="middle">
                <div className="featuredChart">
                    <CircularProgressbar 
                        value={percent} 
                        text={`${percent}%`} 
                        strokeWidth={5} 
                    />
                    <div className="info">
                        <p className="title">Total revenue this month:</p>
                        <p className="amount">${thisMonthRevenue}</p>
                        <p className="desc">Previous transactions processing. Last payments may not be included.</p>
                    </div>
                </div>
            </div>
            <div className="bottom">
            <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Target</div>
                        {
                            thisMonthRevenue > targetRevenue ? (
                                <div className="itemResult positive">
                                    <KeyboardArrowUpOutlinedIcon fontSize='small'/>
                                    <div className="resultAmount">${thisMonthRevenue - targetRevenue}</div>
                                </div>
                            ) : (
                                <div className="itemResult negative">
                                    <KeyboardArrowDownOutlinedIcon fontSize='small'/>
                                    <div className="resultAmount">${targetRevenue - thisMonthRevenue}</div>
                                </div>
                            )
                        }
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Month</div>
                        {
                            thisMonthRevenue > lastMonthRevenue ? (
                                <div className="itemResult positive">
                                    <KeyboardArrowUpOutlinedIcon fontSize='small'/>
                                    <div className="resultAmount">${thisMonthRevenue - lastMonthRevenue}</div>
                                </div>
                            ) : (
                                <div className="itemResult negative">
                                    <KeyboardArrowDownOutlinedIcon fontSize='small'/>
                                    <div className="resultAmount">${lastMonthRevenue - thisMonthRevenue}</div>
                                </div>
                            )
                        }
                    </div>
                    <div className="item">
                        <div className="itemTitle">Year To Date</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDownOutlinedIcon fontSize='small'/>
                            <div className="resultAmount">$12.4k</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured