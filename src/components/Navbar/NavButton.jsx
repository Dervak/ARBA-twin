import Link from "next/link"

const NavButton = ({ title, href }) => {
    return (
        <li className="mx-2">
            <Link
                className="rounded xl:p-4 md:px-2 md:py-4 md:text-sm font-semibold duration-500 shadow-sm bg-[#62c6cf] hover:bg-[#7de3ec] animation-all dark:bg-[#6fbabd] dark:hover:bg-[#57afb2]"
                href={href}
            >
                {title}
            </Link>
        </li>
    )
}

export default NavButton