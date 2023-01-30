import { createContext, useState } from "react";

export const UserSessionContext = createContext()

const UserSessionContextProvider = ({ children }) => {
    const [userSession, setUserSession] = useState(false)
    const [userData, setUserData] = useState({})
    const sessionMethods = {
        userSession,
        setUserSession,
        userData,
        setUserData
    }
    return (
    <UserSessionContext.Provider value={sessionMethods}>
        {children}
    </UserSessionContext.Provider>
    )
}
export default UserSessionContextProvider