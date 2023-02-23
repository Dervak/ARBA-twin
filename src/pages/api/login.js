import { PrismaClient } from "@prisma/client";
import { getConnectionTicket } from "./clearAllBuffers";
import axios from 'axios'
import { decrypt } from "@/utils/encryptationHelper";
import apiAuth from "@/utils/apiAuth";

const loginHandler = apiAuth(async (req, res) => {
    const username = decrypt({ text: req.body.username })
    const pass = decrypt({ text: req.body.pass })
    const prismaResult = await loginPrisma({ username, pass })
    const ssoResult = await loginSso({ username: username.toUpperCase(), pass })
    if (prismaResult.error && ssoResult.error) {
        const prismaError = prismaResult.error
        const ssoError = ssoResult.error
        res.status(404).json({
            auth: false,
            cause: loginErrorHandler({ prismaError, ssoError })
        })
        return
    }

    res.status(200).json({ auth: prismaResult.auth || ssoResult.auth, name: ssoResult.name })
})

const loginSso = async ({ username, pass }) => {
    try {
        const { ticket } = await getConnectionTicket()
        const loginRes = await axios.post(`https://sso.arba.gov.ar/Login/login?service=http://www10.arba.gov.ar/TareasManuales/seguridad/limpiezaBufferEX.do&lt=${ticket}&username=${username}&password=${pass}&userComponent=op_Host`)
        const loginText = loginRes.data
        const auth = !loginText.includes("El usuario ingresado y/o la contrase�a no son v�lidos")
        const name = auth && loginText.match(/<p align="right" class="textoEncabezado" >\s+(.+)&nbsp;<br>/gm).toString().replace(`<p align="right" class="textoEncabezado" >`, "").replace("&nbsp;<br>", "").trim() || undefined
        return { auth, name }
    }
    catch (error) {
        return { auth: false, error }
    }
}

const loginPrisma = async ({ username, pass }) => {
    const prisma = new PrismaClient()
    try {
        const savedPass = await prisma.user.findUnique({
            where: {
                username: username,
            },
            select: {
                pass: true
            }
        }).then(res => res ? res.pass : null)
        prisma.$disconnect()
        return { auth: pass === savedPass }
    }
    catch (error) {
        prisma.$disconnect()
        return { auth: false, error }
    }
}

const loginErrorHandler = ({ prismaError, ssoError }) => {
    if (prismaError.toString().includes("Can't reach database server") && ssoError.code.includes("ENOTFOUND")) return "Falló la autenticación en el servidor SSO"
    return "Error desconocido"
}

export default loginHandler