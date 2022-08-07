import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./customCalendar.scss";
import CalendarToolbar from "./CalendarToolbar";

const localizer = momentLocalizer(moment);
const myEventsList = [
    { start: new Date(), end: new Date('August 10, 2022 12:20:30'), title: "Central Logistics to Keystone Packaging" },
];

const CustomCalendar = () => {
    return (
        <div className="customCalendar">
        <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            defaultView="month"
            views={['month']}
            components={{toolbar: CalendarToolbar}}
        />
        </div>
    )
}

export default CustomCalendar