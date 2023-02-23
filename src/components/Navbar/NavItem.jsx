import Link from "next/link"

const NavItem = ({ title, href }) => {
    return (
        <li className="mx-2">
            <Link
                className="rounded text-center xl:p-4 md:px-2 md:py-4 md:text-sm font-semibold duration-500 hover:bg-[#62c6cf] hover:backdrop-blur"
                href={href}
            >
                {title}
            </Link>
        </li >
    )
}

export default NavItem