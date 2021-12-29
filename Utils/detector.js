import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
import anglesMeasurer from './anglesMeasure';
import '@tensorflow/tfjs-backend-webgl';

export default class Detector {

    // let camera, detectorConfig, detector;

    constructor(camera) {
        this.camera = camera
        this.detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
        this.detector = null;
        this.renderResult = this.renderResult.bind(this);
        // this.cnt = 5
    }

    async renderResult() {
        let poses = null, rafId
        if (this.camera.video.readyState < 2) {
            await new Promise((resolve) => {
                this.camera.video.onloadeddata = () => {
                    resolve(video);
                };
            });
        }
        try {
            poses = await this.detector.estimatePoses(this.camera.video);
            document.getElementById('angle').innerText = anglesMeasurer.elbowAngle(poses[0])
            // console.log(anglesMeasurer.elbowAngle(poses[0]))
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
        this.detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, this.detectorConfig);
        this.renderResult();
    }
}

// const detectorConfig = { modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING };
// export default () => poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);


