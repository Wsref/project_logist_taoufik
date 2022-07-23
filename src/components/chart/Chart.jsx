import './chart.scss'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import React from 'react'

const data = [
    {name: "February", Total: 9000},
    {name: "March", Total: 18750},
    {name: "April", Total: 32000},
    {name: "May", Total: 21000},
    {name: "June", Total: 26000},
    {name: "July", Total: 11000},
]

const Chart = ({aspect, title}) => {
  return (
    <div className='chart'>
        <div className="title">{"Earnings (Last 6 months)"}</div>
        <ResponsiveContainer width="100%" aspect={2 / 1}>
            <AreaChart 
                width={730} 
                height={250} 
                data={data}
                margin={{ 
                    top: 10, 
                    right: 30, 
                    left: 0, 
                    bottom: 0 
                }}
            >
                <defs>
                    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="gray"/>
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area 
                    type="monotone" 
                    dataKey="Total" 
                    stroke="#8884d8" 
                    fillOpacity={1} 
                    fill="url(#total)" 
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}

export default Chart