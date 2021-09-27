import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

const rtlLangs = new Set(['he']);

class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    return await NextDocument.getInitialProps(ctx);
  }

  render() {
    const { locale = '' } = this.props.__NEXT_DATA__;
    const dir = rtlLangs.has(locale) ? 'rtl' : 'ltr';

    return (
      <Html dir={dir} lang={locale}>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/logo.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="logo.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="logo.png" />
          <link rel="apple-touch-icon" sizes="167x167" href="logo.png" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link href="/logo.png" sizes="2048x2732" rel="apple-touch-startup-image" />
          <link href="/logo.png" sizes="1668x2224" rel="apple-touch-startup-image" />
          <link href="/logo.png" sizes="1536x2048" rel="apple-touch-startup-image" />
          <link href="/logo.png" sizes="1125x2436" rel="apple-touch-startup-image" />
          <link href="/logo.png" sizes="1242x2208" rel="apple-touch-startup-image" />
          <link href="/logo.png" sizes="750x1334" rel="apple-touch-startup-image" />
          <link href="/logo.png" sizes="640x1136" rel="apple-touch-startup-image" />
          <meta name="theme-color" content="#000" />
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
