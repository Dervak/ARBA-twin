import axios from "axios";
import Wrapper from "./Wrapper";
import { useState } from "react";

const ClearBuffers = () => {
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
        <Wrapper title="Limpiar Buffers | Operaciones">
            <main className="flex min-h-screen flex-col gap-4 items-center justify-start md:mt-24 xl:mt-48 dark:text-gray-100">
                <h1 className="md:text-3xl xl:text-5xl bold">Borrar todos los buffers</h1>
                <button className="px-8 py-4 rounded font-semibold duration-500 bg-[#62c6cf] hover:bg-[#7de3ec] animation-all dark:bg-[#6fbabd] dark:hover:bg-[#57afb2]" onClick={() => {
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
                        <p className="md:text-xl xl:text-3xl font-semibold after:content-[''] after:animate-dots">Borrando buffers</p>
                    </div>
                }
                {
                    bufferResultsList.length > 0 &&
                    <div className="flex flex-col py-8 justify-center items-center">
                        <ul className="flex flex-col gap-y-4">
                            {bufferResultsList.map(result => <li className="md:text-base xl:text-xl list-disc" key={result}>{result}</li>)}
                        </ul>
                    </div>
                }
            </main>
        </Wrapper>
    );
};

export default ClearBuffers;