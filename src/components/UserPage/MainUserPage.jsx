import Wrapper from "../Wrapper"
import WeatherWidget from "./WeatherWidget"
import Chat from "../Chat/Chat"
import { useRouter } from "next/router"
import { useEffect, useContext } from "react"
import { UserSessionContext } from "@/contexts/UserSessionContext"


const MainUserPage = () => {
    const router = useRouter()
    const { userSession } = useContext(UserSessionContext)
    useEffect(() => {
        !userSession && router.push("/")
    }, [])
    return (
        <Wrapper title="Pagina Inicial | ARBA">
            <div>
                <WeatherWidget />
            </div>
        </Wrapper>
    )
}

export default MainUserPage