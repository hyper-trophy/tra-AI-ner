import { Camera, poseDetector} from '../../Utils';
import { useEffect, useRef } from 'react';
import styles from '../../Styles/HomePage.module.scss'
import PushUpCounter from '../../Utils/Challange/pushUpCounter';

function HomePage() {
    const [
        videoRef,
        canvasRef,
        canvasContainer,
        counterRef
    ] = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

    useEffect(() => {
        (async () => {
            // try {
            const camera = new Camera(videoRef.current, canvasRef.current);
            await camera.setupCamera();
            const USER_VIDEO = true
            const detector = new poseDetector(camera, USER_VIDEO)
            await detector.setupDetector()
            
            // detector.startDetection()

            let pushUpCounter = new PushUpCounter(detector, asanMatcher.asan1Matcher, counterRef)
            pushUpCounter.startCounting();
            // detectorIdeal.startDetection()


            // } catch (error) {
            //     console.log(error);
            //     alert("An error occured, provide this info to developer", error)
            // }
        })()
    }, []);

    return <div>
        Yoga asan 1 !
        <br />
        <div className="canvas-wrapper" ref={canvasContainer}>
            <canvas id="output" ref={canvasRef} ></canvas>
            <video id="video" 
            ref={videoRef} playsInline loop autoPlay
                className={styles.videoElement}>
            </video>
        </div>
        <h1 id="counter" ref={counterRef}>hello</h1>
    </div>
}

export default HomePage