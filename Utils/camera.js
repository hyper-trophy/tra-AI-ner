import * as poseDetection from '@tensorflow-models/pose-detection';

// These anchor points allow the pose pointcloud to resize according to its
// position in the input.
const ANCHOR_POINTS = [[0, 0, 0], [0, 1, 0], [-1, 0, 0], [-1, -1, 0]];

// #ffffff - White
// #800000 - Maroon
// #469990 - Malachite
// #e6194b - Crimson
// #42d4f4 - Picton Blue
// #fabed4 - Cupid
// #aaffc3 - Mint Green
// #9a6324 - Kumera
// #000075 - Navy Blue
// #f58231 - Jaffa
// #4363d8 - Royal Blue
// #ffd8b1 - Caramel
// #dcbeff - Mauve
// #808000 - Olive
// #ffe119 - Candlelight
// #911eb4 - Seance
// #bfef45 - Inchworm
// #f032e6 - Razzle Dazzle Rose
// #3cb44b - Chateau Green
// #a9a9a9 - Silver Chalice
const COLOR_PALETTE = [
    '#ffffff', '#800000', '#469990', '#e6194b', '#42d4f4', '#fabed4', '#aaffc3',
    '#9a6324', '#000075', '#f58231', '#4363d8', '#ffd8b1', '#dcbeff', '#808000',
    '#ffe119', '#911eb4', '#bfef45', '#f032e6', '#3cb44b', '#a9a9a9'
];
export class Camera {
    constructor() {
        this.video = document.getElementById('video')
        this.canvas = document.getElementById('output')
        this.ctx = this.canvas.getContext('2d');
    }

    /**
     * Initiate a Camera instance and wait for the camera stream to be ready.
     * @param cameraParam From app `STATE.camera`.
     */
    static async setupCamera() {

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error(
                'Browser API navigator.mediaDevices.getUserMedia not available');
        }

        const videoConfig = {
            'audio': false,
            'video': {
                facingMode: 'user',
            }
        };

        const stream = await navigator.mediaDevices.getUserMedia(videoConfig);

        const camera = new Camera();
        camera.video.srcObject = stream;

        await new Promise((resolve) => {
            camera.video.onloadedmetadata = () => {
                resolve(video);
            };
        });

        camera.video.play();

        const videoWidth = camera.video.videoWidth;
        const videoHeight = camera.video.videoHeight;
        // Must set below two lines, otherwise video element doesn't show.
        camera.video.width = videoWidth;
        camera.video.height = videoHeight;

        camera.canvas.width = videoWidth;
        camera.canvas.height = videoHeight;
        const canvasContainer = document.querySelector('.canvas-wrapper');
        canvasContainer.style = `width: ${videoWidth}px; height: ${videoHeight}px`;

        // Because the image from camera is mirrored, need to flip horizontally.
        camera.ctx.translate(camera.video.videoWidth, 0);
        camera.ctx.scale(-1, 1);

        return camera;
    }

    drawCtx() {
        this.ctx.drawImage(
            this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
    }

    clearCtx() {
        this.ctx.clearRect(0, 0, this.video.videoWidth, this.video.videoHeight);
    }

    /**
     * Draw the keypoints and skeleton on the video.
     * @param poses A list of poses to render.
     */
    drawResults(poses) {
        for (const pose of poses) {
            this.drawResult(pose);
        }
    }

    /**
     * Draw the keypoints and skeleton on the video.
     * @param pose A pose with keypoints to render.
     */
    drawResult(pose) {
        if (pose.keypoints != null) {
            this.drawKeypoints(pose.keypoints);
            this.drawSkeleton(pose.keypoints, pose.id);
        }
    }

    /**
     * Draw the keypoints on the video.
     * @param keypoints A list of keypoints.
     */
    drawKeypoints(keypoints) {
        const keypointInd =
            poseDetection.util.getKeypointIndexBySide('MoveNet');
        this.ctx.fillStyle = 'Red';
        this.ctx.strokeStyle = 'White';
        this.ctx.lineWidth = 2;

        for (const i of keypointInd.middle) {
            this.drawKeypoint(keypoints[i]);
        }

        this.ctx.fillStyle = 'Green';
        for (const i of keypointInd.left) {
            this.drawKeypoint(keypoints[i]);
        }

        this.ctx.fillStyle = 'Orange';
        for (const i of keypointInd.right) {
            this.drawKeypoint(keypoints[i]);
        }
    }

    drawKeypoint(keypoint) {
        // If score is null, just show the keypoint.
        const score = keypoint.score != null ? keypoint.score : 1;
        const scoreThreshold = 0.3;

        if (score >= scoreThreshold) {
            const circle = new Path2D();
            circle.arc(keypoint.x, keypoint.y, 4, 0, 2 * Math.PI);
            this.ctx.fill(circle);
            this.ctx.stroke(circle);
        }
    }

    /**
     * Draw the skeleton of a body on the video.
     * @param keypoints A list of keypoints.
     */
    drawSkeleton(keypoints, poseId) {
        // Each poseId is mapped to a color in the color palette.
        const color = poseId != null ?
            COLOR_PALETTE[poseId % 20] :
            'White';
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;

        poseDetection.util.getAdjacentPairs('MoveNet').forEach(([
            i, j
        ]) => {
            const kp1 = keypoints[i];
            const kp2 = keypoints[j];

            // If score is null, just show the keypoint.
            const score1 = kp1.score != null ? kp1.score : 1;
            const score2 = kp2.score != null ? kp2.score : 1;
            const scoreThreshold = 0.5;

            if (score1 >= scoreThreshold && score2 >= scoreThreshold) {
                this.ctx.beginPath();
                this.ctx.moveTo(kp1.x, kp1.y);
                this.ctx.lineTo(kp2.x, kp2.y);
                this.ctx.stroke();
            }
        });
    }
}