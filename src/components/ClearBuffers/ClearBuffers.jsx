import axios from "axios";
import Wrapper from "../Wrapper";
import BuffersElement from "./BuffersElement";
import { UserSessionContext } from "@/contexts/UserSessionContext";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

const ClearBuffers = () => {
    let errorTimeout, buffersTimeout = null
    const router = useRouter()
    const [isCleaning, setIsCleaning] = useState(false)
    const [clearError, setClearError] = useState("")
    const [bufferResultsList, setBufferResultsList] = useState([])
    const { userSession, userData } = useContext(UserSessionContext)
    useEffect(() => {
        !userSession && router.push("/")
    }, [])
    const handleClearError = ({ cause }) => {
        setClearError(cause)
        errorTimeout && clearTimeout(errorTimeout)
        errorTimeout = setTimeout(() => {
            setClearError("")
            errorTimeout = null
        }, 10000)
    }
    const handleBufferResults = ({ resultsArray }) => {
        setBufferResultsList(resultsArray)
        buffersTimeout && clearTimeout(buffersTimeout)
        buffersTimeout = setTimeout(() => {
            setBufferResultsList([])
            buffersTimeout = null
        }, 50000)
    }
    const clearAllBuffers = async () => {
        try {
            const res = await axios.post("/api/clearAllBuffers",
                {
                    username: userData.username,
                    pass: userData.pass
                },
                {
                    headers: {
                        'x-api-key': process.env.API_KEY
                    }
                }
            )
            const { resultsArray } = res.data
            handleBufferResults({ resultsArray })
        }
        catch (error) {
            const { cause } = error.response.data
            handleClearError({ cause })
        }
    }
    return userSession && (
        <Wrapper title="Limpiar Buffers | Operaciones">
            <main className="flex min-h-screen flex-col gap-4 items-center justify-start md:mt-24 xl:mt-48 dark:text-gray-100">
                <h1 className="md:text-3xl xl:text-5xl bold">Borrar todos los buffers</h1>
                <button disabled={isCleaning} className="px-8 py-4 rounded font-semibold duration-500 bg-[#62c6cf] hover:bg-[#7de3ec] animation-all dark:bg-[#6fbabd] dark:hover:bg-[#57afb2] disabled:cursor-wait" onClick={() => {
                    setIsCleaning(true)
                    setBufferResultsList([])
                    clearAllBuffers()
                        .then(() => {
                            setIsCleaning(false)
                        })
                }}>Limpiar buffers</button>
                {
                    clearError &&
                    <span className="text-red-400 text-sm text-center">{clearError}</span>
                }
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
                            {bufferResultsList.map(result => <BuffersElement key={result.buffer} buffer={result.buffer} success={result.success} delItems={result.delItems} />)}
                        </ul>
                    </div>
                }
            </main>
        </Wrapper>
    )
}

export default ClearBuffers;