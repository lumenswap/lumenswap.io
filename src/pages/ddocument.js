import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-196265354-1" />

          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `if (document.location.hostname.search("lumenswap.io") !== -1) {
                window.dataLayer = window.dataLayer || [];
                function gtag() { dataLayer.push(arguments); }
                gtag('js', new Date());
          
                gtag('config', 'UA-196265354-1');
              }`,
            }}
          />
          <meta charset="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#000000" />

          <link rel="manifest" href="/manifest.json" />

          <meta name="keywords" content="Stellar, Swap, trade, XLM, Lumens, exchange" />
          <meta
            name="description"
            content="Lumenswap is a decentralized swap protocol for the Stellar Network that allows you to convert assets on the network using a friendly, minimal interface."
          />
          <meta name="subject" content="Lumenswap" />
          <meta name="language" content="EN" />
          <meta name="topic" content="Swap protocol" />
          <meta name="summary" content="Protocol swap for the Stellar network" />
          <meta name="url" content="https://lumenswap.io" />
          <meta name="identifier-URL" content="https://lumenswap.io" />
          <meta name="category" content="Swap" />
          <meta name="distribution" content="Global" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
