import Document, { Html, Head, Main, NextScript } from 'next/document'
import Layout from '../components/layout'
import Navbar from '../components/Navbar/Navbar'
let i=0; 

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    console.log("_document rendered ("+i+")")      
    return (
      <Html lang="en">
        <Head></Head>
        {/* <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="../public/icon.jpg"></link>
          <meta name="theme-color" content="#00aae7" /> */}
        {/* <Head  /> */}
        <body>
          <Layout>
            <Main />
            <NextScript />
          </Layout>
        </body>
      </Html>
    )
  }
}

export default MyDocument