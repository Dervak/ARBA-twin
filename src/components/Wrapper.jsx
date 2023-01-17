import Navbar from "./Navbar"

const Wrapper = ({ children }) => {
    return (
        <div className="bg-gradient-to-b from-[#d1e5e6] to-slate-100 dark:from-[#244242] dark:to-slate-800 transition-all duration-500">
            <Navbar />
            {children}
        </div>
    )
}
export default Wrapper