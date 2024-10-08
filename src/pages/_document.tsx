import type {DocumentProps} from 'next/document'
import {Head, Html, Main, NextScript} from 'next/document'
import React from 'react'

const Document: React.FC<DocumentProps> = () => {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href={'/favicon.ico'} type="image/x-icon" />
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
