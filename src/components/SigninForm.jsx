import axios from "axios"
import { useContext, useState } from "react"
const SigninForm = () => {
    return (
        <div className="min-h-[calc(100vh-6rem)] flex flex-col justify-center items-center">
            <form className="dark:text-gray-100 flex flex-col px-16 gap-y-5 justify-center w-[35%] shadow rounded bg-gradient-to-br from-[#68d0da] to-[#9de4eb] dark:from-[#1c6c73] dark:to-[#2ca9b5] py-10"
                onSubmit={(e) => {
                    console.log(e)
                }}>
                <h2 className="mx-auto text-2xl font-semibold pb-6">Registro</h2>
                <div className="mb-6">
                    <label
                        htmlFor="user"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                        CUIL
                    </label>
                    <input
                        type="text"
                        id="user"
                        className="shadow-inner bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Ingresá tu CUIL"
                        pattern="[^a-zA-Z]+"
                        required
                    />
                </div>
                <div className="flex gap-x-4 mb-6">
                    <div className="w-1/2">
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="shadow-inner bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Ingresá tu nombre"
                            pattern="[^0-9]+"
                            required
                        />
                    </div>
                    <div className="w-1/2">
                        <label
                            htmlFor="surname"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                            Apellido
                        </label>
                        <input
                            type="text"
                            id="surname"
                            className="shadow-inner bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Ingresa tu apellido"
                            pattern="[^0-9]+"
                            required
                        />
                    </div>
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                        Clave
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="shadow-inner bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="repeatPassword"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                        Repetí tu clave
                    </label>
                    <input
                        type="password"
                        id="repeatPassword"
                        className="shadow-inner bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="flex items-center pt-6">
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