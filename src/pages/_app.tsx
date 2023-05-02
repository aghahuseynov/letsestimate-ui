import { AppProvider } from '@/context/appContext'
import { SocketProvider } from '@/context/socketContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <SocketProvider>
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  </SocketProvider>
}
