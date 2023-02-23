import { useState } from "react"
import { EyeFill, EyeSlashFill } from "styled-icons/bootstrap"

const PasswordInput = () => {
    const [showPassword, setShowPassword] = useState(false)
    const handleMouseDown = (event) => {
        setShowPassword(true)
        event.stopPropagation()
        event.preventDefault()
        return false
    }
    const handleMouseUp = (event) => {
        setShowPassword(false)
        event.stopPropagation()
        event.preventDefault()
        return false
    }
    return (
        <div onMouseLeave={handleMouseUp} className="mb-6">
            <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                Clave
            </label>
            <div className="flex relative m-0 p-0">
                <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Clave"
                    className="outline-none shadow-inner bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                />
                <span onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} className="absolute top-2 right-2 cursor-pointer select-none">
                    {showPassword ? <EyeSlashFill className="w-5 h-5 text-gray-400" /> : <EyeFill className="w-5 h-5 text-gray-400" />}
                
                </span>
            </div>

        </div>
    )
}

export default PasswordInput