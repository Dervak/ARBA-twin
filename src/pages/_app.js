import '@/styles/globals.css'
import UserSessionContextProvider from '@/contexts/UserSessionContext'

export default function App({ Component, pageProps }) {

  return (
      <UserSessionContextProvider>
        <Component {...pageProps} />
      </UserSessionContextProvider>
  )
}
