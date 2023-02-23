import axios from "axios"
import fs from "fs-extra"
import path from "path"

const folderName = path.join(__dirname, "weatherToken")
const filePath = path.join(folderName, "weatherToken.txt")

const weather = async (req, res) => {
    const { lat, lon } = req.body
    try {
        const { token } = await getWeatherToken()
        const { locationId } = await getWeatherLocation({ token, lat, lon })
        const { weatherData } = await getWeatherData({ token, locationId })
        res.status(200).json({ weatherData: weatherData })
    }
    catch (error) {
        res.status(400).json({ cause: "El servicio del clima no responde" })
    }
}

const getLocalWeatherToken = async () => {
    try {
        const fileExists = await fs.pathExists(filePath)
        if (fileExists) {
            const localToken = await fs.readFile(filePath, "utf-8")
            return { localToken }
        } else {
            return { localToken: undefined }
        }
    } catch (error) {
        console.error(error)
    }
}

const setLocalWeatherToken = async ({ token }) => {
    try {
        await fs.createFile(filePath)
        await fs.writeFile(filePath, token)
    }
    catch (error) {
        console.log(error)
    }
}

const checkLocalWeatherToken = async ({ localToken }) => {
    if (!localToken) return { isValid: false }
    try {
        await axios.get(`https://ws1.smn.gob.ar/v1/weather`, {
            headers: { 'Authorization': localToken }
        })
    }
    catch (error) {
        const isValid = !error.response.data.error === "Unauthorized"
        return { isValid }
    }
}

const getWeatherToken = async () => {
    const { localToken } = await getLocalWeatherToken()
    const { isValid } = await checkLocalWeatherToken({ localToken })
    if (localToken && isValid) return { token: localToken }
    const res = await axios.get("https://www.smn.gob.ar")
    const webText = res.data
    const tokenText = webText.match(/localStorage.setItem((.+))/g)[0]
    const token = tokenText.replace("localStorage.setItem('token', '", "JWT ").replace("');", "")
    await setLocalWeatherToken({ token })
    return { token }
}

const getWeatherLocation = async ({ token, lat, lon }) => {
    if (!lat && !lon) return { locationId: undefined }
    const locationRes = await axios.get("https://ws1.smn.gob.ar/v1/georef/location/coord", {
        params: {
            lat: lat,
            lon: lon
        },
        headers: { 'Authorization': token }
    })
    return ({ locationId: locationRes.data.id })
}

const getWeatherData = async ({ token, locationId = "8906" }) => {
    const weatherRes = await axios.get(`https://ws1.smn.gob.ar/v1/weather/location/${locationId}`, {
        headers: { 'Authorization': token }
    })
    return { weatherData: weatherRes.data }
}

export default weather