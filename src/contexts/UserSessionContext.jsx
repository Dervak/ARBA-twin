import { createContext, useState } from "react";

export const UserSessionContext = createContext()

const UserSessionContextProvider = ({ children }) => {
    const [userSession, setUserSession] = useState(false)
    const [userData, setUserData] = useState({ username: "", pass: "", name: "" })
    const [sessionError, setSessionError] = useState("")
    const sessionErrorHandler = ({ cause }) => {
        setSessionError(cause)
        setTimeout(() => { setSessionError("") }, 10000)
    }
    const sessionMethods = {
        userSession,
        setUserSession,
        userData,
        setUserData,
        sessionError,
        sessionErrorHandler,
    }
    return (
        <UserSessionContext.Provider value={sessionMethods}>
            {children}
        </UserSessionContext.Provider>
    )
}
export default UserSessionContextProvider