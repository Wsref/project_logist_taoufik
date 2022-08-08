import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./customCalendar.scss";
import CalendarToolbar from "./CalendarToolbar";

const localizer = momentLocalizer(moment);
const myEventsList = [
    { start: new Date('August 14, 2022 15:15:00'), end: new Date('August 20, 2022 05:00:00'), title: "Lakeview Shipping to Keystone Packaging" },
];

const CustomCalendar = () => {
    return (
        <div className="customCalendar">
        <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ minHeight: "300px" }}
            defaultView="month"
            views={['month']}
            components={{toolbar: CalendarToolbar}}
        />
        </div>
    )
}

export default CustomCalendar