import { Camera, poseDetector } from '../../Utils';
import { useEffect, useRef } from 'react';
import styles from '../../styles/HomePage.module.scss'
import PushUpCounter from '../../Utils/Challange/pushUpCounter';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp }) {
    const {
        seconds,
        minutes,
        hours,
        days,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called'), autoStart:false });



    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '100px' }}>
                <span>{minutes}</span>:<span>{seconds}</span>
            </div>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>
            <button onClick={() => {
                // Restarts to 0.5 minutes timer
                const time = new Date();
                time.setSeconds(time.getSeconds() + 30);
                restart(time)
            }}>Restart</button>
        </div>
    );
}

function HomePage() {
    const [
        videoRef,
        canvasRef,
        canvasContainer,
        counterRef
    ] = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];
    const time = new Date()
    time.setSeconds(time.getSeconds() + 30); // 10 minutes time

    useEffect(() => {
        (async () => {
            // time = new Date()
            // try {
            const camera = new Camera(videoRef.current, canvasRef.current);
            await camera.setupCamera();
            const USER_VIDEO = true
            const detector = new poseDetector(camera, USER_VIDEO)
            await detector.setupDetector()

            // detector.startDetection()

            let pushUpCounter = new PushUpCounter(detector, counterRef)
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
        <h1 id="counter" style={{textAlign:"center", width: "100%"}} ref={counterRef}>Reps : 0</h1>
        <MyTimer expiryTimestamp={time} />
    </div>
}

export default HomePage