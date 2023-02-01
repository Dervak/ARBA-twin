import { PrismaClient } from "@prisma/client";
import { getConnectionTicket } from "./clearAllBuffers";
import axios from 'axios'

const prisma = new PrismaClient()

const loginSso = async ({ username, pass }) => {
    try {
        const ticket = await getConnectionTicket()
        const loginRes = await axios.post(`https://sso.arba.gov.arb/Login/login?service=http://www10.arba.gov.ar/TareasManuales/seguridad/limpiezaBufferEX.do&lt=${ticket}&username=${username}&password=${pass}&userComponent=op_Host`)
        const loginText = loginRes.data
        return { auth: !loginText.includes("El usuario ingresado y/o la contrase�a no son v�lidos") }
    }
    catch (error) {
        return { auth: false, error }
    }
}

const loginPrisma = async ({ username, pass }) => {
    try {
        const savedPass = await prisma.user.findUnique({
            where: {
                username: username,
            },
            select: {
                pass: true
            }
        }).then(res => res ? res.pass : null)
        return { auth: pass === savedPass }
    }
    catch (error) {
        return { auth: false, error }
    }
}

const loginHandler = async (req, res) => {
    const { username, pass } = req.body
    const prismaResult = await loginPrisma({ username, pass })
    const ssoResult = await loginSso({ username, pass })
    if (prismaResult.error && ssoResult.error) {
        const errors = {
            prisma: prismaResult.error,
            sso: ssoResult.error
        }
        console.log(errors.prisma.toString().includes("Can't reach database server"))
        res.status(400).json({
            auth: false,
            errors: {
                prisma: prismaResult.error,
                sso: ssoResult.error
            }
        })
        return
    }

    res.status(200).json({ auth: prismaResult.auth || ssoResult.auth })
}

export default loginHandler