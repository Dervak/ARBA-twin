import Head from "next/head"

const PlaceholderPage = ({ message }) => {
    return (
        <>
            <Head>
                <title>{message}...</title>
            </Head>
            <div className="flex gap-x-8 items-center justify-center min-h-screen bg-gradient-to-b from-[#d1e5e6] to-slate-100 dark:from-[#244242] dark:to-slate-800 transition-all duration-500">
                <div className="w-20 h-20 border-2 border-t-4 border-slate-800 rounded-full animate-spin"></div>
                <span className="text-5xl">{message}</span>
            </div>
        </>
    )
}

export default PlaceholderPage