import { useState, useEffect } from "react"
import {Moon, Sunny} from "@styled-icons/ionicons-solid"

const Darkmode = () => {
    const [darkmode, setDarkmode] = useState(false)
    useEffect(() => {
        const savedDarkmode = localStorage.getItem("darkmode")
        savedDarkmode && setDarkmode(savedDarkmode === "true")
    }, [])
    useEffect(() => {
        darkmode && document.body.classList.add("dark")
        !darkmode && document.body.classList.remove("dark")
    }, [darkmode])
    const toggleDarkmode = () => {
        localStorage.setItem("darkmode", !darkmode)
        setDarkmode(!darkmode)
    }
    return (
        <button onClick={toggleDarkmode} className={`relative inline-flex w-8 h-8 justify-center items-center rounded-full transition-all duration-500 hover:bg-[#f2f8f8] dark:hover:bg-[#335c5c]`}>
            <Moon className={`absolute w-7 h-7 transition-all duration-500 text-white ${darkmode ? "opacity-100" : "opacity-0"}`} /><Sunny className= {`absolute w-7 h-7 transition-all duration-500 text-[#282828] ${darkmode ? "opacity-0" : "opacity-100"}`}/>
        </button>
    );
};

export default Darkmode