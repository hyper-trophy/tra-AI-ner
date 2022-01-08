import { useContext, useEffect } from "react";

import AppContext from "../contexts/contexts";
import { GoogleAuthProvider, getAuth, signInWithPopup, inMemoryPersistence, setPersistence} from "firebase/auth";
import firebaseInitiated from "../firebase/firebase.main";

import { collection, addDoc ,setDoc, doc} from "firebase/firestore"; 
import firebaseobj from "../firebase/firebase.main";
import Router from "next/router";


import styles from "./../styles/LoginPage.module.scss";
import GoogleLogo from "./../public/googleIcon.svg";

 function Login() {
    const contextValue = useContext(AppContext);
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
  

    let SignInWithGoogle = ()=>{
        
        signInWithPopup(auth, provider)
        .then(async (result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            // console.log(user)

            try {
                let db = firebaseobj.db;
                await setDoc(doc(db, "users", user.uid), JSON.parse(JSON.stringify(user)), { merge: true }); //addDoc(collection(db, "users"), JSON.parse(JSON.stringify(user)));
                contextValue.appState.setUserState(user, true);
                console.log("user logged in setUserState called")
                Router.push("/")
              } catch (e) {
                console.error("Error adding document: ", e);
              }
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }
    return <h1 style={{color:"#000"}}>
        <div className={styles["loginContainer"]} >
            {/* <button onClick={()=>{SignInWithGoogle()}}>SignInWithGoogle</button> */}
            <div className={styles["loginFormContainer"]} >
                <div className={styles["loginFormLeftContainer"]} >
                <div >
                    Oh, Hello.
                    <br />
                        Welcome back!
                    <br />
                        Log In to your account.
                </div>
                <br />
                    <button onClick={SignInWithGoogle}> <img src={GoogleLogo.src} /> Log In with Google</button>

                    <br />
                    <div style={{fontSize:"14px"}}>Don't have an account? <br />Don't worry, we do that in single-step</div>
                </div>
            </div>
        </div>
    </h1>
  }
  export default Login;