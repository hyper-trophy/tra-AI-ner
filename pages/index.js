import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';

import { Camera, poseDetector, startDetection } from '../Utils';
import { useEffect, useRef } from 'react';
import styles from '../Styles/HomePage.module.css'

function HomePage() {
    const [videoRef, canvasRef] = [useRef(null), useRef(null)];
    let camera, detector;
    useEffect(() => {
        let camera, detector, rafId
        (async () => {
            async function renderResult() {
                if (camera.video.readyState < 2) {
                    await new Promise((resolve) => {
                        camera.video.onloadeddata = () => {
                            resolve(video);
                        };
                    });
                }
                let poses = null;
                try {
                    poses = await detector.estimatePoses(camera.video);
                    // console.log(poses)
                } catch (error) {
                    alert(error);
                }
                camera.drawCtx();
                if (poses && poses.length > 0 ) {
                    camera.drawResults(poses);
                }
                rafId = requestAnimationFrame(renderResult)
            }

            camera = await Camera.setupCamera();

            try{
            const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
            detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
            } catch(error){
                console.log(error);
                alert("Cannot load Pose Detector, make sure you have active internet connection")
            }
            renderResult()

        })()
    }, []);
    return <div>
        Something fucking awesome comming soon !
        <br />
        {/* <video autoPlay ref={videoRef}></video> */}
        <div className="canvas-wrapper">

            <canvas id="output" ref={canvasRef} ></canvas>
            <video id="video" ref={videoRef} playsInline
                className={styles.videoElement}>
            </video>
        </div>
    </div>
}

export default HomePage