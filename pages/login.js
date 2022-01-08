import { useContext, useEffect } from "react";

import AppContext from "../contexts/contexts";
import { GoogleAuthProvider, getAuth, signInWithPopup, inMemoryPersistence, setPersistence} from "firebase/auth";
import firebaseInitiated from "../firebase/firebase.main";

import { collection, addDoc ,setDoc, doc} from "firebase/firestore"; 
import firebaseobj from "../firebase/firebase.main";
import Router from "next/router";

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
        <div>
            <button onClick={()=>{SignInWithGoogle()}}>SignInWithGoogle</button>
        </div>
    </h1>
  }
  export default Login;