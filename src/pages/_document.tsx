/* eslint-disable @next/next/no-title-in-document-head */
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html data-theme="dark" lang="en">
      <Head>
        <title>{`Let's Estimate`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <body className='min-h-screen bg-base-300'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}