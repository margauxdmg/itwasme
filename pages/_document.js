import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,u){
              w.Userback = function(c){w.UserbackQ = w.UserbackQ || [];w.UserbackQ.push(c);};
              var h=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src=u;
              h.parentNode.insertBefore(j,h);
            })(window,document,'script','https://static.userback.io/widget/v1.js');
            Userback('init', 'A-Qfy1lzGmoDrw3qDf0KLZg2gYE');
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