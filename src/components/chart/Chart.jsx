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
        <div className='chart'>
            <div className="top">
                <div className="title">{title}</div>
                <div onClick={handleToggle}><span className="btnText">{isArea ? <AssessmentIcon /> : <CropOriginalIcon />}</span></div>
            </div>
            <ResponsiveContainer className="bottom" maxWidth={"60%"} height={"auto"} aspect={aspect}>
                {isArea ? <AreaChart 
                    width="100%"
                    height="100%"
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0C0268" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#b5e2bb" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="gray"/>
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area 
                        type="monotone" 
                        dataKey="Total" 
                        stroke="#0C0268"
                        fillOpacity={1} 
                        fill="url(#total)" 
                    />
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
                    <Bar dataKey="Total" fill="#82ca9d" />
                </BarChart>
            } 
            </ResponsiveContainer>
        </div>
    )
}

export default Chart