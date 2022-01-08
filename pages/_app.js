import Layout from '../components/layout'
import Navbar from '../components/Navbar/Navbar'
import Router from 'next/router'
import { useEffect, useState } from 'react'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
    console.log("_app rendered") 
    const [hideNav, sethideNav] = useState(true);
    useEffect(() => {
      if(typeof window !='undefined' && (Router.pathname === '/fitnessGame')){
        sethideNav(false)
        console.log("hideNav", hideNav)
      }
    }, [hideNav]);
  return <Layout>
      {hideNav && <Navbar/>}
      <Component {...pageProps} />
  </Layout>
}

export default MyApp