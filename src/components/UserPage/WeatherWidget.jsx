import { useState, useEffect } from "react"
import axios from "axios"
import WeatherIcons from "./WeatherIcons"
import { Refresh } from "styled-icons/evaicons-solid"

const WeatherWidget = () => {
    const [weatherError, setWeatherError] = useState("")
    const [weatherData, setWeatherData] = useState(undefined)
    const [currentLocation, setCurrentLocation] = useState({ lat: "", lon: "" })
    const getCurrentLocation = async () => {
        const location = await new Promise(
            (resolve) => {
                navigator.geolocation.getCurrentPosition(
                    (location) => {
                        resolve({
                            lat: location.coords.latitude,
                            lon: location.coords.longitude
                        })
                    }
                )
            },
            (error) => {
                reject(error)
            }
        )
        location.lon !== currentLocation.lon && location.lat !== currentLocation.lat && setCurrentLocation(location)
    }
    const getWeatherData = async () => {
        try {
            const { data: { weatherData } } = await axios.post("api/weather", {
                lat: currentLocation.lat,
                lon: currentLocation.lon
            })
            weatherError && setWeatherError("")
            setWeatherData(weatherData)
        }
        catch (error) {
            setWeatherData(undefined)
            setWeatherError(error.response.data.cause)
        }
    }
    useEffect(() => {
        getCurrentLocation()
        getWeatherData()
    }, [currentLocation])
    console.log(weatherData)
    return (
        <div className="fixed font-semibold dark:text-white flex flex-col bottom-4 right-4 bg-slate-600/25 dark:bg-white/25 rounded backdrop-blur-sm w-[225px] aspect-[2/1]">
            <button title="Actualizar" className="w-5 h-5 flex justify-center items-center absolute top-1 right-1" onClick={() => getWeatherData()}><Refresh /></button>
            {weatherError && <span className="my-auto text-center">{weatherError}</span>}
            {weatherData && (
                <>
                    <span className="text-xl flex justify-around">{`${weatherData.location.name}`}<span className="text-base">{`${new Date(weatherData.date).getHours()}:${new Date().getMinutes()}`}</span></span>
                    <div className="flex px-2 justify-between items-center">
                        <WeatherIcons weatherId={weatherData.weather.id} weatherDescription={weatherData.weather.description} />
                        <span className="text-3xl">{`${weatherData.temperature}°`}</span>
                    </div>
                    <div className={`flex ${weatherData.feels_like ? "justify-around" : "justify-center"}`}>
                        <span>{`Humedad: ${weatherData.humidity}%`}</span>
                        <span>{weatherData.feels_like && `ST: ${weatherData.feels_like}°`}</span>
                    </div>
                </>
            )}
        </div>
    )
}

export default WeatherWidget
