import Head from "next/head"
import Wrapper from "../components/Wrapper"
import Hero from "../components/Hero"

const Home = () => {
  

  return (
    <>
      <Head>
        <title>ARBA</title>
        <meta
          name="description"
          content="Agencia de Recaudacion de la Provincia de Buenos Aires"
        />
        <link
          rel="icon"
          href="https://web.arba.gov.ar/profiles/arba/themes/custom/arbatheme/favicon.ico"
        />
      </Head>
      <Wrapper>
        <main className="dark:text-white flex min-h-screen flex-col items-center justify-center">
          <Hero/>
          <div className="container flex flex-col w-1/2 items-center justify-center gap-12 px-4 py-16">
            <h1 className="text-6xl font-semibold">
              Paga tus impuestos en un solo lugar con tu CIT
            </h1>
            <p className="text-lg">
              Gestioná tus impuestos, realizá declaraciones juradas, consultá tu
              deuda y más con tu Clave de Identificación Tributaria.
            </p>
          </div>
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16"></div>
        </main>
      </Wrapper>
    </>
  );
};

export default Home;
