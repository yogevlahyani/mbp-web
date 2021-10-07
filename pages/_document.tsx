import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

const rtlLangs = new Set(['he']);

class Document extends NextDocument {
  render() {
    const { locale = '' } = this.props.__NEXT_DATA__;
    const dir = rtlLangs.has(locale) ? 'rtl' : 'ltr';

    return (
      <Html dir={dir} lang={locale}>
        <Head>
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/assets/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/assets/favicon-16x16.png"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/assets/apple-touch-icon.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/assets/apple-touch-icon.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/assets/apple-touch-icon.png"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link
            rel="apple-touch-startup-image"
            sizes="2532x1170"
            href="/splash/2048x2732.png"
          />
          <link
            rel="apple-touch-startup-image"
            sizes="2048x2732"
            href="/splash/2048x2732.png"
          />
          <link
            rel="apple-touch-startup-image"
            sizes="1668x2224"
            href="/splash/1668x2224.png"
          />
          <link
            rel="apple-touch-startup-image"
            sizes="1536x2048"
            href="/splash/1536x2048.png"
          />
          <link
            rel="apple-touch-startup-image"
            sizes="1125x2436"
            href="/splash/1125x2436.png"
          />
          <link
            rel="apple-touch-startup-image"
            sizes="1242x2208"
            href="/splash/1242x2208.png"
          />
          <link
            rel="apple-touch-startup-image"
            sizes="750x1334"
            href="/splash/750x1334.png"
          />
          <link
            rel="apple-touch-startup-image"
            sizes="640x1136"
            href="/splash/640x1136.png"
          />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1A74E2" />
          <meta name="msapplication-TileColor" content="#1A74E2" />
          <meta name="theme-color" content="#1A74E2" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default Document;
