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
        <Head  />
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