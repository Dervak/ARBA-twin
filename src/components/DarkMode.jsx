import { useState } from "react"
import {Moon, Sunny} from "@styled-icons/ionicons-solid"

const DarkMode = () => {
    const [darkMode, setDarkMode] = useState(false)
    const toggleDarkMode = () => {
        document.body.classList.toggle("dark")
        setDarkMode(!darkMode)
    }
    return (
        <button onClick={toggleDarkMode} className={`relative inline-flex w-8 h-8 justify-center items-center rounded-full transition-all duration-500 hover:bg-[#f2f8f8] dark:hover:bg-[#335c5c]`}>
            <Moon className={`absolute w-7 h-7 transition-all duration-500 text-white ${darkMode ? "opacity-100" : "opacity-0"}`} /><Sunny className= {`absolute w-7 h-7 transition-all duration-500 text-[#282828] ${darkMode ? "opacity-0" : "opacity-100"}`}/>
        </button>
    );
};

export default DarkMode