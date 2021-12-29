
import { Camera, poseDetector} from '../Utils';
import { useEffect, useRef } from 'react';
import styles from '../Styles/HomePage.module.css'

function HomePage() {
    const [videoRef, canvasRef ,canvasContainer] = [useRef(null), useRef(null), useRef(null)];

    useEffect(() => {
        (async () => {
            // try {
                const camera = new Camera(videoRef.current, canvasRef.current);
                await camera.setupCamera();
                const detector = new poseDetector(camera)
                detector.startDetection()
            // } catch (error) {
            //     console.log(error);
            //     alert("An error occured, provide this info to developer", error)
            // }
        })()
    }, []);

    return <div>
        Something fucking awesome comming soon !
        <br />
        <div className="canvas-wrapper" ref={canvasContainer}>
            <canvas id="output" ref={canvasRef} ></canvas>
            <video id="video" ref={videoRef} playsInline
                className={styles.videoElement}>
            </video>
        </div>
        <h1 id="angle">hello</h1>
    </div>
}

export default HomePage