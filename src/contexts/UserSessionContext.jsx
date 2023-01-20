import { createContext, useState } from "react";

export const UserSessionContext = createContext()

const UserSessionContextProvider = ({ children }) => {
    const [userSession, setUserSession] = useState(false)
    const sessionMethods = {
        userSession,
        setUserSession
    }
    return (
    <UserSessionContext.Provider value={sessionMethods}>
        {children}
    </UserSessionContext.Provider>
    )
}
export default UserSessionContextProvider