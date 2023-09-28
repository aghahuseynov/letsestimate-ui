/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { AppProvider } from "@/context/appContext";
import { SocketProvider } from "@/context/socketContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/_app.css";
import { Navbar } from "@/components/navbar/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider>
      <AppProvider>
        <div className="App">
          <Navbar />
          <Component {...pageProps} />
        </div>
      </AppProvider>
    </SocketProvider>
  );
}
