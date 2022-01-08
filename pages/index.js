
import { Camera, IdealVideo, poseDetector, VideoPoseMatcher } from '../Utils';
import { useEffect, useRef } from 'react';
import styles from '../styles/HomePage.module.scss'
import Navbar from '../components/Navbar/Navbar';
import Layout from '../components/layout';
import firebaseobj from '../firebase/firebase.main';
import firebaseAdmin from "./../firebase-admin/firebase-admin.main";
import Head from 'next/head'
import Link from 'next/link'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {useRouter} from 'next/router'

function HomePage() {
    const Router = useRouter()
    console.log("hello")
    // const [
    //     videoRef,
    //     canvasRef,
    //     canvasContainer,
    //     canvasRefIdeal,
    //     canvasContainerIdeal,
    //     videoRefIdeal
    // ] = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

    // useEffect(() => {
    //     (async () => {
    //         // try {
    //         const camera = new Camera(videoRef.current, canvasRef.current);
    //         await camera.setupCamera();
    //         const USER_VIDEO = true
    //         const detector = new poseDetector(camera, USER_VIDEO)
    //         await detector.setupDetector()
    //         // detector.startDetection()

    //         const idealVideo = new IdealVideo(videoRefIdeal.current, canvasRefIdeal.current, videoRef.current);
    //         await idealVideo.setupCamera();
    //         const detectorIdeal = new poseDetector(idealVideo, !USER_VIDEO)
    //         await detectorIdeal.setupDetector();

    //         let poseMatcher = new VideoPoseMatcher(detectorIdeal, detector)
    //         poseMatcher.startMatching();
    //         // detectorIdeal.startDetection()


    //         // } catch (error) {
    //         //     console.log(error);
    //         //     alert("An error occured, provide this info to developer", error)
    //         // }
    //     })()
    // }, []);


    const plans=[
        {
            label:'Beginner'
        },
        {
            label:'Intermediate'
        },
        {
            label:'Advanced'
        }
    ];
    return (<Layout>
        <div>
            <Head>
                <Link rel='manifest' href= 'manifest.json'/>
            </Head>
        <div className={styles["app-container-background"]}>
            {/* <Navbar /> */}
            <div className={styles["app-container"]}>

            <div className={styles["app-actions"]}>
                    <div className={styles["each-action-name"]}>Tasks</div>
                   
                    <Grid container spacing={20}>
                     <Grid item xs={4}>
                   <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={plans}
                    sx={{ width: 250}}
                    renderInput={(params) => <TextField {...params} label="Plans" />}
                    />
                    </Grid>
                    <Grid item xs={4}>
                                    
                    <Button size="large" variant="contained" color="success" href="./plans">
                    Continue
                    </Button>

                    </Grid>
                    </Grid>                     
                    
                </div>
                
                <div className={styles["app-actions"]}>
                    <div className={styles["each-action-name"]}>Gym</div>
                    <div className={styles["each-action-choices"]}> 
                        <ul>
                            <li onClick={()=>Router.push("/learn/exercise/curl")}>Bicep Curl</li>
                            <li>Action 2</li>
                            <li>Action 3</li>
                            <li>Action 4</li>                            
                        </ul>
                    </div>
                </div>

                
                <div className={styles["app-actions"]}>
                    <div className={styles["each-action-name"]}>Yoga</div>
                    <div className={styles["each-action-choices"]}> 
                        <ul>
                            <li onClick={()=>Router.push("/learn/yoga/asan1")}>Asan 1</li>
                            <li onClick={()=>Router.push("/learn/yoga/asan2")}>Asan 2</li>
                            <li onClick={()=>Router.push("/learn/yoga/asan3")}> Pose 3</li>
                            <li onClick={()=>Router.push("/learn/yoga/asan4")}>Pose 4</li>
                            <li>Pose 1</li>
                            <li>Pose 2</li>
                            <li>Pose 3</li>
                            <li>Pose 4</li>
                        </ul>
                    </div>
                </div>
                {/* <hr style={{width: "840px", border: "0.5px solid #fff"}} /> */}

                <div className={styles["app-actions"]}>
                    <div className={styles["each-action-name"]}>Music</div>
                    <div className={styles["each-action-choices"]+" "+styles["each-action-special"]}> 
                        <ul>
                            <li>Music 1</li>                            
                        </ul>
                    </div>
                </div>



            </div>
        </div>
    </div>
    </Layout>);

    return <div>
        
        <br />
            <div className="canvas-wrapper-ideal" ref={canvasContainerIdeal}>
                <canvas id="output-ideal" ref={canvasRefIdeal} ></canvas>
                <video id="video-ideal"
                    src="/idealCurl.mkv"
                    ref={videoRefIdeal}
                    playsInline
                    loop
                    className={styles.videoElement}>
                </video>
            </div>
        <div className="canvas-wrapper" ref={canvasContainer}>
            <canvas id="output" ref={canvasRef} ></canvas>
            <video id="video" 
            ref={videoRef} playsInline loop autoPlay
                className={styles.videoElement}>
            </video>
        </div>
        <h1 id="angle">hello</h1>
    </div>
}
export async function getServerSideProps(context) {
    console.log("POA:"+ Object.keys(firebaseAdmin))
    return {
      props: {}, // will be passed to the page component as props
    }
  }

export default HomePage;

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8qKwVcQV8eghtiQxF46b4V5miWMNtppo",
  authDomain: "trainer-83174.firebaseapp.com",
  projectId: "trainer-83174",
  storageBucket: "trainer-83174.appspot.com",
  messagingSenderId: "402436005264",
  appId: "1:402436005264:web:663d5bebaa06108e296715",
  measurementId: "G-0R7BSRL9XT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

*/