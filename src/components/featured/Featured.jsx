import React from 'react'
import './featured.scss'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css"
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const Featured = () => {
    return (
        <div className='featured'>
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <MoreVertOutlinedIcon fontSize='small'/>
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar 
                        value={42} 
                        text={"42%"} 
                        strokeWidth={5} 
                    />
                </div>
                <p className="title">Total revenue this month</p>
                <p className="amount">$11000</p>
                <p className="desc">Previous transactions processing. Last payments may not be included.</p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Target</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDownOutlinedIcon fontSize='small'/>
                            <div className="resultAmount">$16.5k</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Week</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDownOutlinedIcon fontSize='small'/>
                            <div className="resultAmount">$12.4k</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Month</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDownOutlinedIcon fontSize='small'/>
                            <div className="resultAmount">$15k</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured