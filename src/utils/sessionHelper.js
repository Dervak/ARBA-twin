import axios from "axios"
import { encrypt, decrypt } from "./encryptationHelper"

export const checkUserSession = async () => {
    try {
        const session = localStorage.getItem("session")
        if (!session) return { noLocalSession: true }
        const sessionText = decrypt({ text: session })
        const sessionData = JSON.parse(sessionText)
        const username = encrypt({ text: sessionData.username })
        const pass = encrypt({ text: sessionData.pass })
        try {
            const { auth, name } = await loginHelper({ username, pass })
            if (!auth) {
                localStorage.removeItem("session")
                return { auth, cause: "La sesión ha expirado" }
            }
            return { auth, username, pass, name }
        }
        catch (error) {
            const { cause } = error.response.data
            return { auth: false, cause }
        }
    }
    catch (error) {
        return { auth: false, cause: "El servidor de ARBA no responde" }
    }
}

export const loginHelper = async ({ username, pass }) => {
    try {
        const { data: { auth, name } } = await axios.post("api/login",
            {
                username: username,
                pass: pass
            },
            {
                headers: {
                    'x-api-key': process.env.API_KEY
                }
            }
        )
        if (!auth) {
            return { auth, cause: "Usuario o contraseña incorrectos" }
        }
        return { auth, name }
    }
    catch (error) {
        console.log(error)
        const { cause } = error.response.data
        return { auth: false, cause: cause }
    }
}

export const logoutHelper = () => {
    try {
        localStorage.removeItem("session")
        return true
    }
    catch (error) {
        return false
    }
}