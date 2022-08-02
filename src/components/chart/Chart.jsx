import './chart.scss'
import { AreaChart, BarChart, Legend, Bar, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React, { useState } from 'react'
import AssessmentIcon from '@mui/icons-material/Assessment';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';

const data = [
    {name: "February", Total: 9000},
    {name: "March", Total: 18750},
    {name: "April", Total: 32000},
    {name: "May", Total: 21000},
    {name: "June", Total: 26000},
    {name: "July", Total: 11000},
]

const Chart = ({aspect, title}) => {
    const [isArea, setIsArea] = useState(true);

    const handleToggle = () => {
        setIsArea(!isArea);
    }

    return (
        <div className="chart">
            <div className="top">
                <h1 className='title'>Total Revenue (Last 6 Months)</h1>
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
                    data={data}
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
                    <Area type="monotone" dataKey="Total" stroke="#0C0268" fill="#0C0268" />
                    </AreaChart>
                :
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
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
                        <Bar dataKey="Total" fill="#0C0268" />
                    </BarChart>
                }
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default Chart