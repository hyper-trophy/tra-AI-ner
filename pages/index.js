
import { Camera, IdealVideo, poseDetector, VideoPoseMatcher } from '../Utils';
import { useEffect, useRef } from 'react';
import styles from '../styles/HomePage.module.scss'
import Navbar from '../components/Navbar/Navbar';
import Layout from '../components/layout';

function HomePage() {
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

    return (<Layout>
        <div>
        <div className={styles["app-container-background"]}>
            {/* <Navbar /> */}
            <div className={styles["app-container"]}>
                <div className={styles["app-actions"]}>
                    <div className={styles["each-action-name"]}>Gym</div>
                    <div className={styles["each-action-choices"]}> 
                        <ul>
                            <li>Action 1</li>
                            <li>Action 2</li>
                            <li>Action 3</li>
                            <li>Action 4</li>
                            <li>Action 2</li>
                            <li>Action 3</li>
                            <li>Action 4</li>
                            <li>Action 2</li>
                            <li>Action 3</li>
                            <li>Action 4</li>
                            <li>Action 3</li>
                            <li>Action 4</li>
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
                            <li>Pose 1</li>
                            <li>Pose 2</li>
                            <li>Pose 3</li>
                            <li>Pose 4</li>
                        </ul>
                    </div>
                </div>

                <div className={styles["app-actions"]}>
                    <div className={styles["each-action-name"]}>Music</div>
                    <div className={styles["each-action-choices"]}> 
                        <ul>
                            <li>Music 1</li>
                            <li>Music 2</li>
                            <li>Music 3</li>
                            <li>Music 4</li>
                        </ul>
                    </div>
                </div>



            </div>
        </div>
    </div>
    </Layout>);

    return <div>
        Something fucking awesome comming soon !
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

export default HomePage