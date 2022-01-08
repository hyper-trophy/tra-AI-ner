import { useContext, useState, useEffect } from "react";

import Layout from '../components/layout'
import Navbar from '../components/Navbar/Navbar'
import AppContext from "../contexts/contexts";
import { signOut } from "firebase/auth";
import {auth,app} from "./../firebase/firebase.main"
import { getAuth } from "firebase/auth";
import dynamic from "next/dynamic";
import '../styles/index.css'
import { Router } from "next/router";
import {getApps } from "firebase/app"
function MyApp({ Component, pageProps }) {
    // console.log("_app rendered") 
    // const { status, user } = useContext(AuthContext);

    const defaultValue = {
      isLoggedIn: false,
      userState: {},
      setUserState: ()=>{},
      userLogout: ()=>{}
    }
    // console.log(getApps())
  const [appState,setAppState] = useState(defaultValue);  
    
  useEffect(() => {
    
    let auth = getAuth(app)
    
    console.log("_app => "+auth)
    // redundant code is added because conditionally I needed to use 2 times setAppState that's why Hardcoded for if and else blocks
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        setAppState(prevState => {
          return {...prevState, 
                    setUserState: (newUserState, newIsLoggedIn)=>{
                      setAppState(prevStateReal=>{
                        return {...prevStateReal,isLoggedIn:newIsLoggedIn, userState: newUserState}
                      })
                    },
                    userLogout: ()=>{
                      const auth = getAuth();
                      signOut(auth).then(() => {
                        // Sign-out successful.
                        console.log("Log out successfull")
                        setAppState(prevStateReal=>{
                          return {...prevStateReal,isLoggedIn:false, userState: {}}
                        })
                        console.log("Logout route gone")
                        // Router.push("/logout")
                      }).catch((error) => {
                        // An error happened.
                        
                      });
              
                    },
                    userState: user,
                    isLoggedIn: true
                  }
        })
      }else{
        setAppState(prevState => {
          return {...prevState, 
                    setUserState: (newUserState, newIsLoggedIn)=>{
                      setAppState(prevStateReal=>{
                        return {...prevStateReal,isLoggedIn:newIsLoggedIn, userState: newUserState}
                      })
                    },
                    userLogout: ()=>{
                      const auth = getAuth();
                      signOut(auth).then(() => {
                        // Sign-out successful.
                        console.log("Log out successfull")
                        setAppState(prevStateReal=>{
                          return {...prevStateReal,isLoggedIn:false, userState: {}}
                        })
                        console.log("Logout route gone")
                        // Router.push("/logout")
                      }).catch((error) => {
                        // An error happened.
                        
                      });
              
                    }
                  }
        })
      }
    });


    return () => {
      
    }
  }, [])

  useEffect(() => {
    console.log(appState)
    return () => {
      
    }
  }, [appState])


  return (
    <AppContext.Provider value={{appState, setAppState}}>
      <Layout>
            <Navbar />
            <Component {...pageProps} />
        </Layout>
    </AppContext.Provider>
    
  )
}

// export default dynamic(() => Promise.resolve(MyApp), {
//   ssr: false,
// });

export default MyApp