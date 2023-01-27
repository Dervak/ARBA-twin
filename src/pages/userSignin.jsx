import Head from "next/head";
import Wrapper from "@/components/Wrapper";
import SigninForm from "@/components/SigninForm";

const userSignin = () => {
    return (
        <>
            <Head>
                <title>Crear Cuenta | ARBA</title>
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
                <SigninForm />
            </Wrapper>
        </>
    )
}

export default userSignin