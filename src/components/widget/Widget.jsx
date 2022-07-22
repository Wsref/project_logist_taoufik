import React from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import "./widget.scss";

const Widget = () => {
  return (
    <div className='widget'>
        <div className="left">
            <span className="title">TRUCKS</span>
            <span className="counter">150</span>
            <span className="link">See all trucks</span>
        </div>
        <div className="right">
            <div className="percentage positive">
                <KeyboardArrowUpIcon />
                    10%
            </div>
            <LocalShippingOutlinedIcon className="icon" />
        </div>
    </div>
  )
}

export default Widget