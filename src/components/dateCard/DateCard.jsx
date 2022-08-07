import React from 'react'
import './dateCard.scss'

const DateCard = ({heading}) => {




    return (
        <div className='dateCardContainer'>
            <h2 className='header'>{heading}</h2>
                <div className="card-body">
                    <div className="card-left">
                        <div className="information">
                            <div className="resourceTitle">{heading}</div>
                            <div className="data">
                                <div className="resourceData1">{"resourceData1"}</div>
                                <div className="resourceData2">{"resourceData2"}</div>
                            </div>
                        </div>
                    </div>
                    <div className="card-right">
                        <img src="" alt=""/>
                    </div>
                </div>
        </div>
    )
}

export default DateCard