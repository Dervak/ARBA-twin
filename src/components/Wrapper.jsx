import Navbar from "./Navbar"
import UserSessionContextProvider from "@/contexts/UserSessionContext"

const Wrapper = ({ children }) => {
    return (
        <UserSessionContextProvider>
            <div className="bg-gradient-to-b from-[#d1e5e6] to-slate-100 dark:from-[#244242] dark:to-slate-800 transition-all duration-500">
                <Navbar />
                {children}
            </div>
        </UserSessionContextProvider>
    )
}
export default Wrapper