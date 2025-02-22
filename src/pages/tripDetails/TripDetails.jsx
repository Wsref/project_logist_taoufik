import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './tripDetails.scss'
import { useNavigate, useParams } from 'react-router-dom'
import LocationMap from '../../components/locationMap/LocationMap'
import CustomCalendar from '../../components/customCalendar/CustomCalendar'
import InfoCard from '../../components/infoCard/InfoCard'
import { AppContext } from '../../App'
import EditIcon from '@mui/icons-material/Edit';
import VerifiedIcon from '@mui/icons-material/Verified';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import axios from 'axios'


const TripDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [truckInfo, setTruckInfo] = useState([]);
    const [originFacilityInfo, setOriginFacilityInfo] = useState([]); 
    const [destinationFacilityInfo, setDestinationFacilityInfo] = useState([]); 
    const { facilityData, truckData, tripData } = useContext(AppContext);

    // Taoufik 12/02/2025 12:50
        // const mapapi = "https://api.openweathermap.org/geo/1.0/direct?q="+{}+"&limit=5&appid=278a8d62196083076c74c87d1d1b071d";
        const [lattitudestart, setLattitudestart] = useState(-12.0621065);
        const [longitudestart, setLongitudestart] = useState(-77.0365256);
        const [lattitudeend, setLattitudeend] = useState(4.6534649);
        const [longitudeend, setLongitudeend] = useState(-74.0836453);
        const [startcity, setStartcity] = useState("lima");
        const [endtcity, setEndcity] = useState("bogota");

    const [locationArr, setLocationArr] = useState([{latitude: lattitudestart, longitude: longitudestart}, {latitude: lattitudeend, longitude: longitudeend}]);

    const navigate = useNavigate();

    // Taoufik 15/02/2025 11:28
    const [confirmed, setConfirmed] = useState(null);
    const [nonconfirmed, setNonconfirmed] = useState(null);

    // Taoufik 12/02/2025 12:50
    useEffect(() => {
        const fetchLattLogitud = async () => {
            try{
                const mapapi = "https://api.openweathermap.org/geo/1.0/direct?q="+startcity+"&limit=5&appid=278a8d62196083076c74c87d1d1b071d";
                const response = await axios.get(mapapi);
                setLattitudestart(response.data[0]["lat"]);
                setLongitudestart(response.data[0]["lon"]);

                const mapapi2 = "https://api.openweathermap.org/geo/1.0/direct?q="+endtcity+"&limit=5&appid=278a8d62196083076c74c87d1d1b071d";
                const response2 = await axios.get(mapapi2);
                setLattitudeend(response2.data[0]["lat"]);
                setLongitudeend(response2.data[0]["lon"]);

                setLocationArr([
                    {latitude: lattitudestart, longitude: longitudestart}, 
                    {latitude: lattitudeend, longitude: longitudeend}])

            }catch(err) {
                console.log("Error while using openweathermap API :",err);
            }
        }

        fetchLattLogitud();

    },[locationArr])

    useEffect(() => {
        const idResults = tripData.filter(trip => trip.id === id);

        if (idResults.length > 0) {
            setData(idResults[0]);
            if(idResults[0].status == "confirmed"){
                setConfirmed(1)
                setNonconfirmed(null)
            }else{
                setNonconfirmed(1)
                setConfirmed(null)
            }                
            // Testing Date Taoufik 14/02/2025
            // console.log(typeof idResults[0].startDate)        
        } 
    }, [])

    useEffect(() => {
        const tripTruck = truckData.filter(truck => truck.license === data.truck)[0];
        setTruckInfo(tripTruck);

        const tripOriginFacility = facilityData.filter(facility => facility.facilityName === data.originFacility)[0];
        setOriginFacilityInfo(tripOriginFacility);
        // Taoufik 12/02/2025 12:50
        // console.log("check this data",tripOriginFacility);
        if(tripOriginFacility != null)  
            setStartcity(tripOriginFacility.facilityName);

        const tripDestinationFacility = facilityData.filter(facility => facility.facilityName === data.destinationFacility)[0];
        setDestinationFacilityInfo(tripDestinationFacility);
        // Taoufik 12/02/2025 12:50
        if(tripDestinationFacility != null)
            setEndcity(tripDestinationFacility.facilityName);

    }, [data])



    const timeDiffCalc = () => {
        let diffInMilliSeconds = Math.abs(new Date(data.endDate) - new Date(data.startDate)) / 1000;

        // calculate days
        const days = Math.floor(diffInMilliSeconds / 86400);
        diffInMilliSeconds -= days * 86400;

        // calculate hours
        const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
        diffInMilliSeconds -= hours * 3600;

        // calculate minutes
        const minutes = Math.floor(diffInMilliSeconds / 60) % 60;

        let difference = '';
        
        if (days > 0) {
            difference += (days === 1) ? `${days} day, ` : `${days} days, `;
        }

        if (hours > 0) {
            difference += (hours === 1) ? `${hours} hour, ` : `${hours} hours, `;
        }

        if (minutes > 0) {
            difference += (minutes === 1) ? `${minutes} minute` : `${minutes} minutes,`;
        }
         
        if (days === 0 && hours === 0 && minutes === 0) {
            difference += "No time"
        }

        return difference;
    }

    return (
        <div className="tripDetails">
            <Sidebar />
            <div className="tripContainer">
                <Navbar />
                <div className="tripView">
                    <div className="left">
                        <div className="left-top">
                        <div className="left-left">
                            <div className="tripSummary">
                                <div className="path">
                                    <div className="facility originFacility">{data.originFacility}</div>
                                    <span>to</span>
                                    <div className="facility originFacility">{data.destinationFacility}</div>
                                </div>
                                <div className="dates">
                                    <div className="date startDate">{new Date(data.startDate).toLocaleString()}</div>
                                    <span></span>
                                    <div className="date endDate">{new Date(data.endDate).toLocaleString()}</div>
                                </div>
                                <div className="summary">
                                    {`${timeDiffCalc()} ${data.earnings}dh`}
                                </div>
                            </div>
                        </div>
                        
                        <div className="left-right">
                            {
                                confirmed &&
                                <div className="editBtn">
                                        <span>Confirmed </span><VerifiedIcon className='icon' onClick={() => navigate(`/trips/${id}`)}/>
                                </div>
                            }
                            {
                                nonconfirmed &&
                                <div className="editBtn">
                                        <span>UnConfirmed </span><NewReleasesIcon className='icon' onClick={() => navigate(`/trips/edit/${id}`)}/>
                                </div>
                            }   
                        </div>
                        </div>
                        <hr />
                        {
                            (truckInfo && originFacilityInfo && destinationFacilityInfo) &&
                            <div className="left-bottom">
                                <InfoCard resource="truck" heading="Truck" data={truckInfo} />
                                <InfoCard resource="facility" heading="Origin Facility" data={originFacilityInfo} />
                                <InfoCard resource="facility" heading="Destination Facility" data={destinationFacilityInfo} />
                            </div>
                        }
                    </div>
                    <div className="right">
                        <div className="right-top">
                            <LocationMap locationArray={locationArr}/>
                        </div>
                        <div className="right-bottom">
                            <CustomCalendar dateRange={[{
                                start: new Date(data.startDate),
                                end: new Date(data.endDate),
                                title: `${data.originFacility} to ${data.destinationFacility}`
                            }]}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripDetails;