import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import './style.css'


function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2
    })
    const [name, setName] = useState('');

    const handleClick = (e) => {
        if (name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=16bfa98849718de13b6e8978b87d47b8&units=metric`;
            axios.get(apiUrl)
                .then(res => {
                    setData({
                        ...data, celcius: res.data.main.temp, name: res.data.name,
                        humidity: res.data.main.humidity, speed: res.data.wind.speed
                    })
                })
                .catch(err => console.log(err));
        }

    }

    return (
        <div className='container'>
            <div className='weather'>
                <div className='search'>
                    <input type="text" placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
                    <button><img src="/images/search.png" onClick={handleClick} alt="" /></button>
                </div>
                <div className='winfo'>
                    <img src="/images/clods.png" alt="clouds" />
                    <h1>{data.celcius}° c</h1>
                    <h2>{data.name}</h2>
                    <div className='details'>
                        <div className='col'>
                            <img src="/images/humidity.png" alt="humidity" />
                            <div className='humidity'>
                                <p>{Math.round(data.humidity)}</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className='col'>
                            <img src="/images/wind.png" alt="wind" />
                            <div className='wind'>
                                <p>{Math.round(data.speed)}kmph</p>
                                <p>Wind</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home