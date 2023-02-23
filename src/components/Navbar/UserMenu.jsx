import { useContext, useState } from "react"
import { useRouter } from "next/router"
import { UserSessionContext } from "@/contexts/UserSessionContext"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { decrypt } from "@/utils/encryptationHelper"

const UserMenu = () => {
    const { userData, setUserData, setUserSession } = useContext(UserSessionContext)
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const logout = () => {
        localStorage.removeItem("session")
        setUserData({ username: "", pass: "", name:"" })
        setUserSession(false)
        router.reload()
    }
    return (
        <DropdownMenu.Root asChild onOpenChange={() => { setIsOpen(!isOpen) }}>
            <DropdownMenu.Trigger className={`${isOpen && "bg-[#f2f8f8] dark:bg-[#335c5c]"} rounded py-[0.35rem] px-2 md:text-sm font-semibold duration-500 transition-all hover:bg-[#f2f8f8] dark:hover:bg-[#335c5c]`}>
                {userData.name ? userData.name : decrypt({text: userData.username})}
                <svg
                    viewBox="0 0 20 20"
                    className={`inline dark:fill-white w-4 h-4 -mt-1 ml-1 transition-transform duration-200 transform ${isOpen ? 'rotate-180 translate-x-1' : 'rotate-0'}`}
                >
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.8839 15.5303C12.3957 16.0185 11.6043 16.0185 11.1161 15.5303L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"></path>
                </svg>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end" className="bg-[#f2f8f8] top-0 dark:bg-[#335c5c] rounded mt-1 shadow-sm py-2 px-[0.1rem] z-50">
                <DropdownMenu.Item onClick={logout} className="cursor-pointer hover:bg-[#7de3ec] dark:hover:bg-[#57afb2] px-5 rounded-sm transition-all duration-500 focus-visible:outline-none">
                    Cerrar sesión
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    )
}

export default UserMenu