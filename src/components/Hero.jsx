import Link from "next/link";
import HeroForm from "./HeroForm";

const Hero = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center gap-x-32 dark:text-white">
      <section className="mb-64 flex w-[40%] flex-col gap-y-12 px-4">
        <h1 className="xl:text-6xl text-4xl font-semibold">
          Paga tus impuestos en un solo lugar con tu CIT
        </h1>
        <p className="text-xl">
          Gestioná tus impuestos, realizá declaraciones juradas, consultá tu
          deuda y más con tu Clave de Identificación Tributaria.
        </p>
      </section>
      <section className="flex xl:w-[30%] w-[45%] max-w-md shadow flex-col items-center rounded bg-gradient-to-br from-[#68d0da] to-[#9de4eb] dark:from-[#1c6c73] dark:to-[#2ca9b5] py-16 px-4">
        <h2 className="mx-auto mb-12 text-2xl font-semibold">Autogestión</h2>
        <HeroForm />
        <Link href={"/userSignin"} className="pt-10 text-[#5994f5] dark:text-[#3344ff] dark:drop-shadow-none drop-shadow-sm bg-clip-text -mb-4 text-sm">Todavía no tenes tu CIT? Gestionala acá!</Link>
      </section>
    </div>
  );
};

export default Hero;
