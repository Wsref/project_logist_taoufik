import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './tripDetails.scss'
import { useNavigate, useParams } from 'react-router-dom'
import Map from '../../components/map/Map'
import CustomCalendar from '../../components/customCalendar/CustomCalendar'
import InfoCard from '../../components/infoCard/InfoCard'
import { AppContext } from '../../App'

const TripDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [truckInfo, setTruckInfo] = useState([]);
    const [originFacilityInfo, setOriginFacilityInfo] = useState([]); 
    const [destinationFacilityInfo, setDestinationFacilityInfo] = useState([]); 
    const { facilityData, truckData, tripData } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        const idResults = tripData.filter(trip => trip.id === id);

        if (idResults.length > 0) {
            setData(idResults[0]);
        } else {
            navigate("/404");
        }
    }, [])

    useEffect(() => {
        const tripTruck = truckData.filter(truck => truck.license === data.truck)[0];
        setTruckInfo(tripTruck)

        const tripOriginFacility = facilityData.filter(facility => facility.facilityName === data.originFacility)[0];
        setOriginFacilityInfo(tripOriginFacility)

        const tripDestinationFacility = facilityData.filter(facility => facility.facilityName === data.destinationFacility)[0];
        setDestinationFacilityInfo(tripDestinationFacility)
    }, [data, facilityData, truckData, tripData])

    return (
        <div className="tripDetails">
            <Sidebar />
            <div className="tripContainer">
                <Navbar />
                <div className="tripView">
                    <div className="left">
                        <div className="left-top">
                            <div className="tripSummary">
                                <div className="path">
                                    <div className="facility originFacility">{data.originFacility}</div>
                                    <span>to</span>
                                    <div className="facility originFacility">{data.destinationFacility}</div>
                                </div>
                                <div className="dates">
                                    <div className="date startDate">{data.startDate}</div>
                                    <span>to</span>
                                    <div className="date endDate">{data.endDate}</div>
                                </div>
                                <div className="summary">
                                    {`26.3 hours, $${data.earnings}`}
                                </div>
                            </div>
                            <hr />
                        </div>
                        
                        <div className="left-bottom">
                            <InfoCard resource="truck" heading="Truck" data={truckInfo} />
                            <InfoCard resource="facility" heading="Origin Facility" data={originFacilityInfo} />
                            <InfoCard resource="facility" heading="Destination Facility" data={destinationFacilityInfo} />
                        </div>
                    </div>
                    <div className="right">
                        <div className="right-top">
                            <Map />
                        </div>
                        <div className="right-bottom">
                            <CustomCalendar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripDetails;