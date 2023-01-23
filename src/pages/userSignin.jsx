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
            </Head>
            <Wrapper>
                <SigninForm />
            </Wrapper>
        </>
    )
}

export default userSignin