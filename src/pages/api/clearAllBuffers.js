import axios from 'axios'
import { env } from 'next.config'

const clearAllBuffers = async (req, res) => {
    const buffers = await getAllBuffers()
    const resultsArray = await Promise.all(buffers.map(async (buffer) => {
        const ticket = await getConnectionTicket()
        const loginProps = {
            ticket: ticket,
            buffer: buffer
        }
        const result = await clearBuffer(loginProps)
        return result
    }))
    res.status(200).json({ resultsArray })
}

const getAllBuffers = async () => {
    const hostUsr = process.env.HOST_USR
    const hostPsw = process.env.HOST_PSW

    try {
        const ticket = await getConnectionTicket()
        const buffersRes = await axios.post(`https://sso.arba.gov.ar/Login/login?service=http://www10.arba.gov.ar/TareasManuales/seguridad/limpiezaBufferEX.do&lt=${ticket}&username=${hostUsr}&password=${hostPsw}&userComponent=op_Host`)
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
        return buffers
    }
    catch (error) {
        // console.log(error)
    }
}

const getConnectionTicket = async () => {
    const connectionRes = await axios.get("https://sso.arba.gov.ar/Login/login?service=http://www10.arba.gov.ar/TareasManuales/seguridad/limpiezaBufferEX.do")
    const ticketText = connectionRes.data.match(/<input type="hidden" name="lt" value="(.+)">/g).toString()
    const ticket = ticketText.replace(`<input type="hidden" name="lt" value="`, "").replace(`">`, "")
    return ticket
}

const clearBuffer = async ({ ticket, buffer }) => {
    const { id, name } = buffer
    const res = await axios.post(`https://sso.arba.gov.ar/Login/login?service=http%3A%2F%2Fwww10.arba.gov.ar%2FTareasManuales%2Fseguridad%2FlimpiezaBuffer.do%3Fbuffer%3D${id}&lt=${ticket}&username=D752480&password=Gimnasia22&userComponent=op_Host`)
    const webText = res.data
    if (webText.includes("El borrado se ha realizado correctamente.")) {
        const delItemsText = webText.match(/<td class="texto11" align="center">Cantidad de Objetos Borrados :&nbsp;<b>(.+)<\/b><\/td>/g).toString()
        const delItems = delItemsText.replace(`<td class="texto11" align="center">Cantidad de Objetos Borrados :&nbsp;<b>`, "").replace(`</b></td>`, "")
        return `El buffer ${name} se limpio correctamente y se borraron ${delItems} items.`
        // console.log(`El buffer ${name} se limpio correctamente y se borraron ${delItems} items.`)
    } else {
        return `La limpieza del buffer ${name} falló.`
        // console.log(`La limpieza del buffer ${name} falló.`)
    }
}
export default clearAllBuffers