import axios from "axios"
import { useContext, useState } from "react"
const SigninForm = () => {
    return (
        <div className="my-auto">
            <form onSubmit={(e) => {
                login(e).then(() => setIsLogging(false))
            }} className="flex flex-col px-20 gap-y-10 justify-center h-max">
                <div className="mb-6">
                    <label
                        htmlFor="user"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        CUIL
                    </label>
                    <input
                        type="text"
                        id="user"
                        className="shadow-inner bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Ingresá tu CUIL"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Clave
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="shadow-inner bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="repeatPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Repetí tu clave
                    </label>
                    <input
                        type="password"
                        id="repeatPassword"
                        className="shadow-inner bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="flex items-center">
                    <button
                        type="submit"
                        className="shadow-sm bg-[#d1e5e6] hover:bg-[#dff4f5] animation-all duration-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm mx-auto w-full sm:w-1/2 px-5 py-2.5 text-center dark:bg-[#6fbabd] dark:hover:bg-[#57afb2] dark:focus:ring-blue-800"
                    >
                        Crear CIT
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SigninForm