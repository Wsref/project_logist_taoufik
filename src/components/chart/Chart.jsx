import './chart.scss'
import { AreaChart, BarChart, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React, { useState, useContext, useEffect } from 'react'
import AssessmentIcon from '@mui/icons-material/Assessment';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import { AppContext } from '../../App'

const data = [
    {name: "February", Total: 9000},
    {name: "March", Total: 18750},
    {name: "April", Total: 32000},
    {name: "May", Total: 21000},
    {name: "June", Total: 26000},
    {name: "July", Total: 11000},
]



const Chart = ({ title }) => {
    const [isArea, setIsArea] = useState(true);
    const { tripData } = useContext(AppContext);
    const [ earningData, setEarningData ] = useState([]);
    const [lastSixMonths, setLastSixMonths] = useState([]);
    
    const toMonthName = (monthNumber) => {
        const date = new Date();
        date.setMonth(monthNumber);

        return date.toLocaleString('en-US', {
            month: 'long',
        });
    }


    useEffect(() => {
        const today = new Date();
        const thisMonthIndex = today.getMonth();

        const populateDates = () => {
            setEarningData([]);

            for (let i = 6; i > 0 ; i--) {
                    setEarningData(prev => [...prev, {
                        "name": toMonthName(thisMonthIndex + 1 - i), 
                        "Total": (
                                    tripData.filter(trip => ( new Date(new Date(trip.startDate)).getMonth() === (thisMonthIndex + 1 - i)) && ( new Date(trip.startDate)).getTime() <= today.getTime()
                                    ).map(
                                        trip => trip.earnings
                                    ).reduce(
                                        (previousVal, currentVal) => (previousVal + currentVal), 0
                                    )
                                )
                            }
                        ]
                    )
                }
            }
            populateDates();
        }, [])


    const handleToggle = () => {
        setIsArea(!isArea);
    }


    return (
        <div className="chart">
            <div className="top">
                <h1 className='title'>{title}</h1>
                <div onClick={handleToggle}>
                    <span className="btnText">{isArea ? <AssessmentIcon /> : <CropOriginalIcon />}</span>
                </div>
            </div>
            <div className="bottom">
                <ResponsiveContainer width="100%" height="100%">
                {isArea ?
                    <AreaChart
                    width={300}
                    height={300}
                    data={earningData}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="Total" stroke="#807dbd" fill="#807dbd" />
                    </AreaChart>
                :
                    <BarChart
                        width={500}
                        height={300}
                        data={earningData}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="Total" fill="#807dbd" />
                    </BarChart>
                }
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Chart