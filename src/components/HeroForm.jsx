import axios from "axios"
import { encrypt } from "@/utils/encryptationHelper"
import { useContext, useState } from "react"
import { UserSessionContext } from "@/contexts/UserSessionContext"

const checkboxDarkUrl = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KCjwhLS0gTGljZW5zZTogUEQuIE1hZGUgYnkgZmljdGlvbjogaHR0cHM6Ly9naXRodWIuY29tL2ZpY3Rpb24tY29tL2ZpY29ucyAtLT4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTc5MiAxNzkyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNzkyIDE3OTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTE1MzYuNCw0MjQuNmMtNTYuOC01Ni40LTE0OC4zLTU2LjQtMjA0LjcsMGwtNjMzLjksNjM0LjZMNDYwLjMsODIxLjljLTU2LjgtNTYuNC0xNDguMy01Ni40LTIwNC43LDAKCWMtNTYuNCw1Ni44LTU2LjQsMTQ4LjMsMCwyMDQuN2wzMjYuMSwzMjUuOGMzLjksNS4xLDguMiwxMC4xLDEyLjksMTQuOGMzNC42LDM0LjYsODIuMyw0OC4xLDEyNi45LDQwLjUKCWMyOS4yLTQuNiw1Ny4zLTE4LjEsNzkuNy00MC41YzQuNy00LjcsOS05LjcsMTIuOS0xNC45bDcyMi4zLTcyM0MxNTkyLjgsNTcyLjUsMTU5Mi44LDQ4MSwxNTM2LjQsNDI0LjZ6Ii8+ICAKPC9zdmc+Cg==')"
const checkboxUrl = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCg0KPCEtLSBMaWNlbnNlOiBQRC4gTWFkZSBieSBmaWN0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vZmljdGlvbi1jb20vZmljb25zIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDE3OTIgMTc5MiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTc5MiAxNzkyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8cGF0aCBkPSJNMTUzNi40LDQyNC42Yy01Ni44LTU2LjQtMTQ4LjMtNTYuNC0yMDQuNywwbC02MzMuOSw2MzQuNkw0NjAuMyw4MjEuOWMtNTYuOC01Ni40LTE0OC4zLTU2LjQtMjA0LjcsMA0KCWMtNTYuNCw1Ni44LTU2LjQsMTQ4LjMsMCwyMDQuN2wzMjYuMSwzMjUuOGMzLjksNS4xLDguMiwxMC4xLDEyLjksMTQuOGMzNC42LDM0LjYsODIuMyw0OC4xLDEyNi45LDQwLjUNCgljMjkuMi00LjYsNTcuMy0xOC4xLDc5LjctNDAuNWM0LjctNC43LDktOS43LDEyLjktMTQuOWw3MjIuMy03MjNDMTU5Mi44LDU3Mi41LDE1OTIuOCw0ODEsMTUzNi40LDQyNC42eiIvPg0KPC9zdmc+DQo=')"
const HeroForm = () => {
    const [isLogging, setIsLogging] = useState(false)
    const { userSession, setUserSession } = useContext(UserSessionContext)
    const login = async (e) => {
        const { currentTarget } = e
        const { user, password, remember } = currentTarget
        setIsLogging(true)
        e.preventDefault()
        const encryptProps = {
            text: password.value
        }
        console.log(encrypt(encryptProps))
        try {
            const { data: { auth } } = await axios.post("api/login", {
                username: user.value,
                pass: password.value
            })
            console.log(auth)
            setUserSession(auth)
        }
        catch (error) {
            console.log(error.response.data.auth)
        }
        currentTarget.reset()
    }

    return (
        <form onSubmit={(e) => {
            login(e).then(() => setIsLogging(false))
        }} className="w-[85%]">
            <div className="mb-6">
                <label
                    htmlFor="user"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    DNI / CUIL
                </label>
                <input
                    type="text"
                    id="user"
                    className="shadow-inner bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="DNI o CUIL"
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
            <div className="flex items-start mb-6">
                <div className="flex items-center h-5 scale-110">
                    <input
                        id="remember"
                        type="checkbox"
                        defaultValue=""
                        className={`-z-10 shadow-inner w-4 h-4 active:outline-none focus:outline-none checked:bg-[#dff4f5] dark:checked:bg-[#57afb2] bg-gray-50 rounded border border-gray-100 focus:ring-0 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-0 dark:focus:ring-offset-0 focus:ring-offset-0 dark:checked:bg-[${checkboxDarkUrl}] checked:bg-[${checkboxUrl}]`}
                    />
                </div>
                <label
                    htmlFor="remember"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Recordarme
                </label>
            </div>
            <div className="flex items-center">
                <button
                    type="submit"
                    className="shadow-sm bg-[#d1e5e6] hover:bg-[#dff4f5] animation-all duration-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm mx-auto w-full sm:w-1/2 px-5 py-2.5 text-center dark:bg-[#6fbabd] dark:hover:bg-[#57afb2] dark:focus:ring-blue-800"
                >
                    {isLogging ? "Iniciando sesión..." : "Iniciar sesión"}
                </button>
            </div>
        </form>
    )
}
export default HeroForm