import Layout from '../components/layout'
import Navbar from '../components/Navbar/Navbar'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
    console.log("_app rendered") 
  return <Layout>
      <Navbar />
      <Component {...pageProps} />
  </Layout>
}

export default MyApp