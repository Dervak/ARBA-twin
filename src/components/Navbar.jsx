import Link from "next/link";
import DarkMode from "./DarkMode";
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset)
    window.removeEventListener('scroll', onScroll)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${offset > 0 && "shadow-sm"} duration-500 transition-shadow pointer-events-auto z-10 bg-[#d1e5e6] dark:bg-[#234041] bg-opacity-90 dark:bg-opacity-90 backdrop-blur sticky top-0 px-8 flex justify-between w-full items-center dark:text-white`}>
      <nav className="">
        <ul className="flex flex-row items-center">
          <li className="mx-2">
            <Link href="/" className="rounded p-4">
              <div className="flex flex-row items-center">
                <h1 className="text-5xl font-bold">ARBA</h1>
                <span className="inline-block max-w-[15rem] px-4 align-baseline text-sm font-normal uppercase">
                  Agencia de recaudación provincia de buenos aires
                </span>
              </div>
            </Link>
          </li>
          <li className="mx-2">
            <Link
              className="rounded p-4 font-semibold duration-500 hover:bg-[#62c6cf] hover:backdrop-blur"
              href="/pay"
            >
              Pagar
            </Link>
          </li>
          <li className="mx-2">
            <Link
              className="rounded p-4 font-semibold duration-500 hover:bg-[#62c6cf] hover:backdrop-blur"
              href="/"
            >
              Centro de ayuda
            </Link>
          </li>
          <li className="mx-2">
            <Link
              className="rounded p-4 font-semibold duration-500 hover:bg-[#62c6cf] hover:backdrop-blur"
              href="/"
            >
              Trámites
            </Link>
          </li>
          <li className="mx-2">
            <Link
              className="rounded p-4 font-semibold duration-500 hover:bg-[#62c6cf] hover:backdrop-blur"
              href="/"
            >
              IB Simplificado
            </Link>
          </li>
          <li className="mx-2">
            <Link
              className="rounded p-4 font-semibold duration-500 bg-[#62c6cf] hover:bg-[#7de3ec]"
              href="/clearBuffers"
            >
              Limpiar Buffers
            </Link>
          </li>
        </ul>
      </nav>
      <DarkMode />
    </header>
  );
};

export default Navbar;
