/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-title-in-document-head */
import { ThemeProvider } from "@/context/themeContext";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>{`Let's Estimate`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
