/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { AppProvider } from "@/context/appContext";
import { SocketProvider } from "@/context/socketContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/_app.css";
import { Navbar } from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/context/themeContext";
import { Main } from "@/components/main/Main";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider>
      <ThemeProvider>
        <AppProvider>
          <Main Component={Component} pageProps={pageProps} />
        </AppProvider>
      </ThemeProvider>
    </SocketProvider>
  );
}
