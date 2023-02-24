import Head from "next/head"
import { useContext, useEffect, useState } from "react"
import { UserSessionContext } from "@/contexts/UserSessionContext"
import Navbar from "./Navbar/Navbar"
import { checkUserSession } from "@/utils/sessionHelper"
import PlaceholderPage from "./PlaceholderPage"

const Wrapper = ({ children, title = "ARBA" }) => {
    const { userSession, setUserData, setUserSession, sessionErrorHandler } = useContext(UserSessionContext)
    const [gettingLocalSession, setGettingLocalSession] = useState(false)
    useEffect(() => {
        const getLocalSession = async () => {
            setGettingLocalSession(true)
            const { auth, cause, name, username, pass, noLocalSession } = await checkUserSession()
            if (noLocalSession) return { session: false }
            if (!auth) {
                sessionErrorHandler({ cause })
                return { auth: false }
            }
            sessionErrorHandler({ cause })
            setUserSession(auth)
            setUserData({ username, pass, name })
        }
        !userSession && getLocalSession()
            .then(() => {
                setGettingLocalSession(false)
            })
    }, [])
    return !gettingLocalSession
        ? (
            <>
                <Head>
                    <title>{title}</title>
                    <meta
                        name="description"
                        content="Agencia de Recaudacion de la Provincia de Buenos Aires"
                    />
                    <link
                        rel="icon"
                        href="https://web.arba.gov.ar/profiles/arba/themes/custom/arbatheme/favicon.ico"
                    />
                </Head>
                <div className="min-h-screen bg-gradient-to-b from-[#d1e5e6] to-slate-100 dark:from-[#244242] dark:to-slate-800 transition-all duration-500">
                    <Navbar />
                    <main className="min-h-[calc(100vh-96px)]">
                        {children}
                    </main>
                </div>
            </>
        )
        : (
            <PlaceholderPage message="Comprobando sesión" />
        )
}
export default Wrapper