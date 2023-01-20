import axios from "axios";
import Head from "next/head";
import Wrapper from "../components/Wrapper";
import { useState } from "react";



const clearBuffers = () => {
    const [isCleaning, setIsCleaning] = useState(false)
    const [bufferResultsList, setBufferResultsList] = useState([])
    const clearAllBuffers = async () => {
        try {
            const res = await axios.post("/api/clearAllBuffers")
            const { resultsArray } = res.data
            setBufferResultsList(resultsArray)
        }
        catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <Head>
                <title>Limpiar Buffers | Operaciones</title>
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
                <main className="flex min-h-screen flex-col gap-4 items-center justify-start mt-48">
                    <h1 className="text-5xl bold">Borrar todos los buffers</h1>
                    <button className="px-8 py-4 rounded font-semibold duration-500 bg-[#62c6cf] hover:bg-[#7de3ec]" onClick={() => {
                        setBufferResultsList([])
                        setIsCleaning(true)
                        console.log(isCleaning)
                        clearAllBuffers()
                            .then(() => {
                                setIsCleaning(false)
                                console.log(isCleaning)
                            })
                    }}>Limpiar buffers</button>
                    {
                        isCleaning &&
                        <div className="flex flex-col py-8 justify-center items-center">
                            <p className="text-3xl font-semibold after:content-[''] after:animate-dots">Borrando buffers</p>
                        </div>
                    }
                    {
                        bufferResultsList.length > 0 &&
                        <div className="flex flex-col py-8 justify-center items-center">
                            <ul className="flex flex-col gap-y-4">
                                {bufferResultsList.map(result => <li className="text-xl list-disc" key={result} >{result}</li>)}
                            </ul>
                        </div>
                    }
                </main>
            </Wrapper>
        </>
    );
};

export default clearBuffers;