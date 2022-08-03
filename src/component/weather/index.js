import React     from 'react'
import * as ant  from "antd";
import * as icon from "@ant-design/icons";
import moment    from 'moment';

export default function Weather(props) {
    
    const refresh = () => {
        window.location.reload();
    }

    return (
        <ant.Row className='main'>
            <div className="top ">
                <p className="header">{props.weatherData.name}</p>
                <ant.Button style={{width:"35px",height:"35px"}} type="primary" shape="circle" icon={<icon.ReloadOutlined />} onClick={refresh}/>
            </div>
            <ant.Col md={24} className='info' style={{display:"flex",justifyContent:"space-between"}}>
                <p className="day">Day: {moment().format('dddd')}</p>
                <p className="day">{moment().format('LL')}</p>
            </ant.Col>
            <ant.Col md={24} className='info' style={{display:"flex",justifyContent:"space-between"}}>
                <p className="temp">Temprature: {props.weatherData.main.temp} &deg;C</p>
                <p className="temp">Humidity: {props.weatherData.main.humidity} %</p>
            </ant.Col>
            <ant.Col md={24} className='info' style={{display:"flex",justifyContent:"space-between"}}>
                <p className="sunrise-sunset">Sunrise: {new Date(props.weatherData.sys.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
                <p className="sunrise-sunset">Sunset: {new Date(props.weatherData.sys.sunset * 1000).toLocaleTimeString('en-IN')}</p>
            </ant.Col>
        </ant.Row>
    )
}
