
import { Camera, IdealVideo, poseDetector } from '../Utils';
import { useEffect, useRef } from 'react';
import styles from '../Styles/HomePage.module.css'

function HomePage() {
    const [
        videoRef,
        canvasRef,
        canvasContainer,
        canvasRefIdeal,
        canvasContainerIdeal,
        videoRefIdeal
    ] = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

    useEffect(() => {
        (async () => {
            // try {
            const camera = new Camera(videoRef.current, canvasRef.current);
            await camera.setupCamera();
            const USER_VIDEO = true
            const detector = new poseDetector(camera, USER_VIDEO)
            detector.startDetection()

            const idealVideo = new IdealVideo(videoRefIdeal.current, canvasRefIdeal.current, videoRef.current);
            await idealVideo.setupCamera();
            const detectorIdeal = new poseDetector(idealVideo, !USER_VIDEO)
            detectorIdeal.startDetection()


            // } catch (error) {
            //     console.log(error);
            //     alert("An error occured, provide this info to developer", error)
            // }
        })()
    }, []);

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