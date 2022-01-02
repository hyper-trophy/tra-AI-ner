import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import anglesMeasurer from './anglesMeasure';
import '@tensorflow/tfjs-backend-webgl';

export default class Detector {

    // let camera, detectorConfig, detector;

    constructor(camera, userVideo) {
        this.camera = camera
        this.detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
        this.detector = null;
        this.renderResult = this.renderResult.bind(this);
        this.isUserVideo = userVideo
        // this.cnt = 5
    }

    async setupDetector() {
        try {
            this.detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, this.detectorConfig);
            return true
        } catch (err) {
            console.log(err);
            return false
        }
    }

    async getPoseKeypoints() {
        if (this.isUserVideo && this.camera.video.readyState < 2) {
            await new Promise((resolve) => {
                this.camera.video.onloadeddata = () => {
                    resolve();
                };
            });
        }
        try {
            const poses = await this.detector.estimatePoses(this.camera.video);
            return poses
        } catch (error) {
            console.log(error)
        }
    }
    
    async renderResult() {
        let poses = null, rafId
        if (this.isUserVideo && this.camera.video.readyState < 2) {
            await new Promise((resolve) => {
                this.camera.video.onloadeddata = () => {
                    resolve(video);
                };
            });
        }
        try {
            poses = await this.detector.estimatePoses(this.camera.video);
            // let angle = Math.floor(anglesMeasurer.elbowAngle(poses[0]))
            // document.getElementById('angle').innerText = angle
            // console.log(angle, (new Date()).getSeconds())
        } catch (error) {
            cancelAnimationFrame(rafId)
            // alert(error);
            console.log(error)
        }
        this.camera.drawCtx();
        if (poses && poses.length > 0) {
            this.camera.drawResults(poses);
        }
        rafId = requestAnimationFrame(this.renderResult)
    }


    async startDetection() {
        this.renderResult();
    }
}

// const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
// export default () => poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);


