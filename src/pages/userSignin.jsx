import Head from "next/head";
import Wrapper from "@/components/Wrapper";
import SigninForm from "@/components/SigninForm";

const userSignin = () => {
    return (
        <Wrapper title="Crear Cuenta | ARBA">
            <SigninForm />
        </Wrapper>
    )
}

export default userSignin