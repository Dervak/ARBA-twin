import Link from "next/link";
import HeroForm from "./Form/HeroForm";

const Hero = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center gap-x-32 dark:text-white">
      <section className="mb-64 flex w-[40%] flex-col gap-y-12 px-4">
        <h1 className="xl:text-6xl text-4xl font-semibold text-center">
          Hola 👋
        </h1>
        <p className="text-2xl whitespace-pre-line">
          Estuve trabajando en algunas mejoras, ahora para borrar los buffers hay que inciar sesión con el usuario de HOST.
          <br/><br/>
          Si quieren que nunca se cierre la sesión hagan click en recordarme y cualquier sugerencia o idea que tengan para agregar me dicen! 
          Al menos hasta que se pueda hacer todo por Control-M
        </p>
      </section>
      <section className="flex xl:w-[30%] w-[45%] max-w-md shadow flex-col items-center rounded bg-gradient-to-br from-[#68d0da] to-[#9de4eb] dark:from-[#2ca9b5] dark:to-[#1c6c73] py-16 px-4">
        <h2 className="mx-auto text-2xl font-semibold">Autogestión</h2>
        <HeroForm />
        <Link href={"/userSignin"} className="pt-10 text-[#5994f5] dark:text-[#ff7272] font-semibold bg-clip-text -mb-4 text-sm">Todavía no tenes tu CIT? Gestionala acá!</Link>
      </section>
    </div>
  );
};

export default Hero;
