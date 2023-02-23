import MainUserPage from "@/components/UserPage/MainUserPage"
import { useContext, useEffect } from "react"
import { UserSessionContext } from "@/contexts/UserSessionContext"
import { useRouter } from "next/router"

const userPage = () => {
    const router = useRouter()
    const {userSession} = useContext(UserSessionContext)
    useEffect(() => {
        !userSession && router.push("/")
    }, [])
    return userSession && <MainUserPage/>
}

export default userPage