import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.Userback = window.Userback || {};
            Userback.access_token = "A-Qfy1lzGmoDrw3qDf0KLZg2gYE";
            (function(d) {
              var s = d.createElement('script');
              s.async = true;
              s.src = 'https://static.userback.io/widget/v1.js';
              (d.head || d.body).appendChild(s);
            })(document);
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}