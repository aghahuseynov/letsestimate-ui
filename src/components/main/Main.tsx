import { ThemeContext } from "@/context/themeContext";
import React, { useContext } from "react";
import { Navbar } from "../navbar/Navbar";

export const Main = ({ pageProps, Component }: any) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div id={theme} className="App">
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
};
