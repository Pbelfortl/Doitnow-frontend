import { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>DoItNow</title>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
        <link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet"/>
      </Head>
      <body>
        <Main />
        <NextScript />
        <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
        <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
      </body>
    </Html>
  )
}
