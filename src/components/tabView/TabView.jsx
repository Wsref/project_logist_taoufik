import React, { useState } from 'react'
import './tabView.scss'

const TabView = ({ title, tabs = {}}) => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const activateTab = (index) => {
        setActiveTabIndex(index);
    }

    return (
        <div className='tabView'>
            { title && (<h4 className="title">{title}</h4>) }
            <div className="body">
                {
                    (Object.keys(tabs).length === 0 ?
                        <div>No Tabs</div>:
                        <div className="tabContainer">
                            <div className="tabs">
                                {
                                    tabs.map((tab, index) => 
                                        <label
                                            key={index}
                                            className={index === activeTabIndex ? "activeTab" : "tab"}
                                            onClick={() => activateTab(index)}
                                        >
                                            {tab.name}
                                        </label>
                                    )
                                }
                            </div>
                            <div className="content">
                                {tabs[activeTabIndex].content}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default TabView