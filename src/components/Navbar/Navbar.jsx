import Link from "next/link";
import { UserSessionContext } from "@/contexts/UserSessionContext"
import Darkmode from "./Darkmode";
import { useEffect, useState, useContext } from 'react';
import NavItem from "./NavItem";
import NavButton from "./NavButton";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const [offset, setOffset] = useState(0);
  const { userSession, userData, sessionError } = useContext(UserSessionContext)

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset)
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="flex flex-col sticky top-0">
      {sessionError &&
        <div className="sticky top-0 w-full text-center text-white text-lg bg-red-400">
          {sessionError}
        </div>
      }
      <header className={`${offset > 0 && "shadow-sm"} duration-500 transition-shadow pointer-events-auto z-10 bg-[#d1e5e6] dark:bg-[#234041] bg-opacity-90 dark:bg-opacity-90 backdrop-blur px-8 flex justify-between w-full items-center dark:text-white`}>
        <nav className="">
          <ul className="flex flex-row items-center">
            <li className="mx-2">
              <Link href="/" className="rounded p-4">
                <div className="flex flex-row items-center">
                  <h1 className="text-5xl font-bold">ARBA</h1>
                  <span className=" max-w-[15rem] px-4 align-baseline text-sm font-normal uppercase xl:inline-block hidden">
                    Agencia de recaudación provincia de buenos aires
                  </span>
                </div>
              </Link>
            </li>
            <NavItem title="Pagar" href="/pay" />
            <NavItem title="Centro de ayuda" href="/" />
            <NavItem title="Trámites" href="/" />
            {userSession && <NavButton title="Limpiar Buffers" href="/clearBuffers" />}
          </ul>
        </nav>
        <div className="flex gap-x-4">
          {userSession && <UserMenu />}
          <Darkmode />
        </div>
      </header>
    </div>
  );
};

export default Navbar;
