/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { AppProvider } from '@/context/appContext'
import { SocketProvider } from '@/context/socketContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <SocketProvider>
    <AppProvider>
      <div className="navbar bg-neutral text-neutral-content">

        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">{`Let's Estimate`}</a>
        </div>
        <div className="flex-none">
          <a href="https://www.buymeacoffee.com/aghahuseynov">
            <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=aghahuseynov&button_colour=BD5FFF&font_colour=ffffff&font_family=Poppins&outline_colour=000000&coffee_colour=FFDD00" />
          </a>
        </div>
      </div>
      <Component {...pageProps} />
    </AppProvider>
  </SocketProvider>
}
