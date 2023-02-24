import axios from 'axios'
import { Cookie } from 'tough-cookie'
import { decrypt } from '@/utils/encryptationHelper'
import apiAuth from '@/utils/apiAuth'


const clearAllBuffers = apiAuth(async (req, res) => {
    const username = decrypt({ text: req.body.username }).toUpperCase()
    const pass = decrypt({ text: req.body.pass })
    try {
        const { cookie, error: authError } = await authenticate({ username, pass })
        if (authError) throw authError
        const { buffers, error: buffersError } = await getAllBuffers({ cookie })
        if (buffersError) throw buffersError
        const resultsArray = await Promise.all(
            buffers.map(async (buffer) => {
                const { ticket } = await getConnectionTicket()
                const result = await clearBuffer({ ticket, username, pass, buffer })
                return result
            }))
        res.status(200).json({ resultsArray })
    }
    catch (error) {
        res.status(400).json({ error, cause: "El servidor de ARBA no responde" })
    }
})

const authenticate = async ({ username, pass }) => {
    try {
        const { ticket, error: ticketError } = await getConnectionTicket()
        if (ticketError) throw ticketError
        const authRes = await axios.post(`https://sso.arba.gov.ar/Login/login?service=http://www10.arba.gov.ar/TareasManuales/seguridad/limpiezaBufferEX.do&lt=${ticket}&username=${username}&password=${pass}&userComponent=op_Host`)
        const cookie = Cookie.parse(authRes.headers['set-cookie'].toString())
        return { cookie: cookie.cookieString() }
    }
    catch (error) {
        return { error }
    }
}

const getAllBuffers = async ({ cookie }) => {
    try {
        const buffersRes = await axios.get(`http://www10.arba.gov.ar/TareasManuales/seguridad/limpiezaBufferEX.do`, {
            headers: {
                Cookie: cookie
            },
        })
        const idText = buffersRes.data.match(/<input type="radio" name="opciones" onclick="setOpcion(.+)">/g)
        const idArray = idText.map(id => {
            return parseInt(id.replace(`<input type="radio" name="opciones" onclick="setOpcion('`, "").replace(`')">`, ""))
        })
        const nameText = buffersRes.data.match(/<BR \/>\n\t\t\t\n\t\t\t\n(.+)/g)
        const nameArray = nameText.map(name => {
            return name.replace(`<BR />\n\t\t\t\n\t\t\t\n\t\t\t`, "").trim()
        })
        const buffers = idArray.map((id, i) => {
            return {
                id: id,
                name: nameArray[i]
            }
        })
        return { buffers }
    }
    catch (error) {
        return { error }
    }
}

export const getConnectionTicket = async () => {
    try {
        const connectionRes = await axios.get("https://sso.arba.gov.ar/Login/login?service=http://www10.arba.gov.ar/TareasManuales/seguridad/limpiezaBufferEX.do")
        const ticketText = connectionRes.data.match(/<input type="hidden" name="lt" value="(.+)">/g).toString()
        const ticket = ticketText.replace(`<input type="hidden" name="lt" value="`, "").replace(`">`, "")
        return { ticket }
    }
    catch (error) {
        return { error }
    }
}

const clearBuffer = async ({ buffer, username, pass, ticket }) => {
    const { id, name } = buffer
    try {
        const res = await axios.post(`https://sso.arba.gov.ar/Login/login?service=http%3A%2F%2Fwww10.arba.gov.ar%2FTareasManuales%2Fseguridad%2FlimpiezaBuffer.do%3Fbuffer%3D${id}&lt=${ticket}&username=${username}&password=${pass}&userComponent=op_Host`)
        const webText = res.data
        if (webText.includes("El borrado se ha realizado correctamente.")) {
            const delItemsText = webText.match(/<td class="texto11" align="center">Cantidad de Objetos Borrados :&nbsp;<b>(.+)<\/b><\/td>/g).toString()
            const delItems = delItemsText.replace(`<td class="texto11" align="center">Cantidad de Objetos Borrados :&nbsp;<b>`, "").replace(`</b></td>`, "")
            return { buffer: name, success: true, delItems: delItems }
            // console.log(`El buffer ${name} se limpio correctamente y se borraron ${delItems} items.`)
        } else {
            return { buffer: name, success: false, delItems: null }
            // console.log(`La limpieza del buffer ${name} falló.`)
        }
    } catch (error) {
        return { error }
    }
}
export default clearAllBuffers