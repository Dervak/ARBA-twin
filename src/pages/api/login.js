import { PrismaClient } from "@prisma/client";
import { getConnectionTicket } from "./clearAllBuffers";
import axios from 'axios'

const prisma = new PrismaClient()

const loginSso = async ({ username, pass }) => {
    const ticket = await getConnectionTicket()
    const loginRes = await axios.post(`https://sso.arba.gov.ar/Login/login?service=http://www10.arba.gov.ar/TareasManuales/seguridad/limpiezaBufferEX.do&lt=${ticket}&username=${username}&password=${pass}&userComponent=op_Host`)
    const loginText = loginRes.data
    if (loginText.includes("El usuario ingresado y/o la contraseña no son válidos")) {
        return false
    } else {
        return true
    }
}

const loginHandler = async (req, res) => {

    const { username, pass } = req.query
    const savedPass = await prisma.user.findUnique({
        where: {
            username: username,
        },
        select: {
            pass: true
        }
    }).then(res => {
        return res ? res.pass : null
    })
    //check if exists in local
    if (pass === savedPass) {
        res.status(200).json({ auth: true })
        return
    }
    //check if exists in sso
    if (await loginSso({ username, pass })) {
        res.status(200).json({ auth: true })
        return
    }
    //login failed
    res.status(401).json({ auth: false })
}

export default loginHandler