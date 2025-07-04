import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <script src="https://static.userback.io/widget/v1.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              Userback.init('A-Qfy1lzGmoDrw3qDf0KLZg2gYE');
            `
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}