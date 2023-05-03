import { AppProvider } from '@/context/appContext'
import { SocketProvider } from '@/context/socketContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <SocketProvider>
    <AppProvider>
      <div className="navbar bg-neutral text-neutral-content">
        <a className="btn btn-ghost normal-case text-xl">{`Let's Estimate`}</a>
      </div>
      <Component {...pageProps} />
    </AppProvider>
  </SocketProvider>
}
