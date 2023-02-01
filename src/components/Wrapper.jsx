import Head from "next/head"
import { useContext } from "react"
import { UserSessionContext } from "@/contexts/UserSessionContext"
import Navbar from "./Navbar"

const Wrapper = ({ children, title = "ARBA" }) => {
    const { userSession } = useContext(UserSessionContext)
    return (
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
                <div className="flex items-center justify-center">
                    {userSession.toString()}
                </div>
                {children}
            </div>
        </>
    )
}
export default Wrapper