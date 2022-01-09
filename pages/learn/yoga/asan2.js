import { Camera, poseDetector } from '../../../Utils';
import YogaPoseMatcher from '../../../Utils/PoseMatcher/YogaAsan'
import asanMatcher from '../../../Utils/PoseMatcher/YogaAsan/asanChecker'
// import curlChecker from '../../../Utils/PoseMatcher/Exercise/curl'
import { useEffect, useRef } from 'react';
import Image from 'next/image'
import styles from '../../../styles/HomePage.module.scss'

function HomePage() {
    const [
        videoRef,
        canvasRef,
        canvasContainer,
        canvasRefIdeal,
        canvasContainerIdeal,
        videoRefIdeal,
        suggestionRef
    ] = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

    useEffect(() => {
        (async () => {
            // try {
            const camera = new Camera(videoRef.current, canvasRef.current);
            await camera.setupCamera();
            const USER_VIDEO = true
            const detector = new poseDetector(camera, USER_VIDEO)
            await detector.setupDetector()

            // detector.startDetection()

            let poseMatcher = new YogaPoseMatcher(detector, asanMatcher.asan2Matcher, suggestionRef)
            poseMatcher.startMatching();
            // detectorIdeal.startDetection()


            // } catch (error) {
            //     console.log(error);
            //     alert("An error occured, provide this info to developer", error)
            // }
        })()
    }, []);

    return <div>
        Yoga asan 2 !
        <br />
        <Image src='/asans/asan2.jpg' width={500} height={300} />
        <div className="canvas-wrapper" ref={canvasContainer}>
            <canvas id="output" ref={canvasRef} ></canvas>
            <video id="video"
                ref={videoRef} playsInline loop autoPlay
                className={styles.videoElement}>
            </video>
        </div>
        <h1 id="suggestion" ref={suggestionRef}>hello</h1>
    </div>
}

export default HomePage