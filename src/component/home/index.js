import React, { useEffect, useState } from "react";
import * as ant                        from "antd";
import Weather                        from "../weather";  
export default function Home() {
    const [lat, setLat]   = useState([]);
    const [long, setLong] = useState([]);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        var api_url = 'https://api.openweathermap.org/data/2.5'
        var api_key = `ac57f98ebbacbc922a7df1b373903e22`
        const fetchData = async () => {
          navigator.geolocation.getCurrentPosition(function(position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        });
          await fetch(`${api_url}/weather/?lat=${lat}&lon=${long}&appid=${api_key}`)
            .then(res => res.json())
            .then(result => {
                setData(result)
            });
        }
        fetchData();
    }, [lat,long])

    return (
        <div>
            {(typeof data.main !== 'undefined') ? (
                <Weather weatherData={data}/>
            ): (
                <ant.Spin/>
            )}
        </div>
    )
}