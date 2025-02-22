import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './locationMap.scss'
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API);
Geocode.setLocationType("ROOFTOP");

const LocationMap = ({locationArray}) => {

    const initlattcent = locationArray[0].latitude;
    const initlongicent = locationArray[1].longitude;
    const [lattcent, setLattcent] = useState(locationArray[0].latitude);
    const [longicent, setLongicent] = useState(locationArray[1].longitude);
    const [good,setGood] = useState();
    // console.log("lattcent",lattcent);
    // console.log("longcent",longicent);

    useEffect(() => {
        setLattcent(locationArray[0].latitude);
        setLongicent(locationArray[1].longitude);
        if( (initlattcent != lattcent)){
            setGood(1);
        }
            
        // console.log("latt",lattcent);
        // console.log("setgood",good);

    },[locationArray])


    return (
        <div className='mapContainer'>
            
            {good && 
                <MapContainer center={[lattcent, longicent]} zoom={3} scrollWheelZoom={true}>
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    {
                        locationArray.map((location) => (
                        <Marker
                            key={location.latitude.toString()}
                            position={[location.latitude, location.longitude]}
                        >
                        
                        </Marker>
                    ))
                }
                </MapContainer> 
            
            }
        </div>
    )
}

export default LocationMap