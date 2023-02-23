import Wrapper from "../components/Wrapper"
import Hero from "../components/Hero"
import { useContext } from "react"
import { UserSessionContext } from "@/contexts/UserSessionContext"
import { useRouter } from "next/router"
import { decrypt } from "@/utils/encryptationHelper"

const Home = () => {
  const router = useRouter()
  const { userSession, userData} = useContext(UserSessionContext)
  if (userSession) {
    router.push({
      pathname: '/[userPage]',
      query: { userPage: decrypt({ text: userData.username }) },
    })
  }
  return !userSession && (
    <Wrapper>
      <main className="dark:text-white flex min-h-screen flex-col items-center justify-center">
        <Hero />
      </main>
    </Wrapper>
  );
};

export default Home;
