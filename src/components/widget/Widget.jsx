import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import {collection, query, where, getDoc, getDocs} from "firebase/firestore";
import { db } from '../../firebase';
import "./widget.scss";

const Widget = ({ type }) => {

    const [amount, setAmount] = useState(null);
    const [diff, setDiff] = useState(null);

    let data;

    switch(type) {
        case "truck":
            data = {
                title: "TRUCKS",
                isMoney: false,
                link: "All trucks",
                url: "/trucks",
                query: "trucks",
                icon: (
                    <LocalShippingOutlinedIcon
                        className="icon" 
                        style={{
                            color: "crimson",
                            backgroundColor: "rgba(255, 0, 0, .2)"
                        }}
                    />
                )
            }
            break;
        case "trip":
            data = {
                title: "TRIPS",
                isMoney: false,
                link: "All trips",
                url: "/trips",
                query: "trips",
                icon: (
                    <MapOutlinedIcon 
                        className="icon" 
                        style={{
                            color: "goldenrod",
                            backgroundColor: "rgba(218, 165, 32, .2)"
                        }}
                    />
                )
            }
            break;
        case "facility":
            data = {
                title: "FACILITIES",
                isMoney: false,
                link: "All facilities",
                url: '/facilities',
                query: "facilities",
                icon: (
                    <FactoryOutlinedIcon
                        className="icon" 
                        style={{
                            color: "green",
                            backgroundColor: "rgba(0, 128, 0, .2)"
                        }}
                    />
                )
            }
            break;
        case "earning":
            data = {
                title: "EARNINGS",
                isMoney: true,
                link: "All earnings",
                url: "",
                query: "trips",
                icon: (
                    <MonetizationOnOutlinedIcon
                        className="icon" 
                        style={{
                            color: "purple",
                            backgroundColor: "rgba(128, 0, 128, .2)"
                        }}
                    />
                )
            }
            break;
        default:
            break;
    }

    useEffect(() => {
        const fetchData = async () => {
            if (type !== "earning") {
                const today = new Date();
                const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
                const previousMonth = new Date(new Date().setMonth(today.getMonth() - 2));

                const totalQuery = query(
                    collection(db, data.query)
                )

                const lastMonthQuery = query(
                    collection(db, data.query), 
                    where("timeStamp", "<=", today), 
                    where("timeStamp", ">", lastMonth)
                )

                const previousMonthQuery = query(
                    collection(db, data.query), 
                    where("timeStamp", "<=", lastMonth), 
                    where("timeStamp", ">", previousMonth)
                );

                const totalQueryData = await getDocs(totalQuery);
                const lastMonthData = await getDocs(lastMonthQuery);
                const prevMonthData = await getDocs(previousMonthQuery);

                setAmount(totalQueryData.docs.length);
                setDiff((((lastMonthData.docs.length - prevMonthData.docs.length) / prevMonthData.docs.length) * 100).toFixed(0))
            } else {
                const today = new Date();
                const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
                const previousMonth = new Date(new Date().setMonth(today.getMonth() - 2));

                const totalQuery = query(
                    collection(db, "trips")
                )

                const lastMonthQuery = query(
                    collection(db, "trips"), 
                    where("timeStamp", "<=", today), 
                    where("timeStamp", ">", lastMonth)
                )

                const previousMonthQuery = query(
                    collection(db, "trips"), 
                    where("timeStamp", "<=", lastMonth), 
                    where("timeStamp", ">", previousMonth)
                );

                const totalQueryData = await getDocs(totalQuery);
                const lastMonthData = await getDocs(lastMonthQuery);
                const prevMonthData = await getDocs(previousMonthQuery);

                let sum = 0;

                totalQueryData.docs.forEach(doc => {
                    let docData = doc.data();

                    sum += parseInt(docData.earnings) 
                })

                setAmount(sum);
            }
        }

        fetchData();
    }, [])



    return (
        <div className='widget'>
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "$"}{amount}</span>
                <Link to={data.url} style={{textDecoration: "none"}}>
                    <span className="link">{data.link}</span>
                </Link>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                        10%
                </div>
                {data.icon}
            </div>
        </div>
    )
}

export default Widget