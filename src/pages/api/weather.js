import axios from "axios"

const getWeatherToken = async () => {
    const res = await axios.get("https://www.smn.gob.ar")
    const webText = res.data
    const tokenText = webText.match(/localStorage.setItem((.+))/g)[0]
    const token = tokenText.replace("localStorage.setItem('token', '", "JWT ").replace("');", "")
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude)
    })
    // getWeatherLocation({ token, lat: "-34.9123307", lon: "-57.9540781" })
    return token
}

const getWeatherLocation = async ({ token, lat, lon }) => {
    const locationRes = await axios.get("https://ws1.smn.gob.ar/v1/georef/location/coord", {
        params: {
            lat: lat,
            lon: lon
        },
        headers: { 'Authorization': token }
    })
    return (locationRes.data.id)
}

const getWeatherData = async ({ token, id = "8906" }) => {
    const weatherRes = await axios.get(`https://ws1.smn.gob.ar/v1/weather/location/${id}`, {
        headers: { 'Authorization': token }
    })
    return weatherRes.data
}

export default getWeatherToken