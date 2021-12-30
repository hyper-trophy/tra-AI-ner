import anglesMeasure from "./anglesMeasure"

class VideoPoseMatcher {
    constructor(detector1, detector2) {
        this.referenceDetector = detector1
        this.userDetector = detector2
        this.startMatching = this.startMatching.bind(this)
        this.ELBOW_THRESHOLD = 20
        this.SHOULDER_THRESHOLD = 10
        this.BACK_THRESHOULD = 10
    }

    async startMatching() {
        let refId
        const [
            referencePose,
            userPose
        ] = await Promise.all([
            this.referenceDetector.getPoseKeypoints(),
            this.userDetector.getPoseKeypoints()
        ])

        const
            referenceAngleElbow = anglesMeasure.elbowAngle(referencePose),
            userAngleElbow = anglesMeasure.elbowAngle(userPose)

        if (Math.abs(userAngleElbow - referenceAngleElbow) > this.ELBOW_THRESHOLD) {
            //render in red
            this.userDetector.camera.drawCtx();
            if (userPose && userPose.length > 0) {
                this.userDetector.camera.drawResults(userPose);
            }
            this.referenceDetector.camera.drawCtx();
            if (referencePose && referencePose.length > 0) {
                this.referenceDetector.camera.drawResults(referencePose);
            }
        } else {
            //render in green
            this.userDetector.camera.drawCtx();
            if (userPose && userPose.length > 0) {
                this.userDetector.camera.drawResults(userPose);
            }
            this.referenceDetector.camera.drawCtx();
            if (referencePose && referencePose.length > 0) {
                this.referenceDetector.camera.drawResults(referencePose);
            }
        }

        refId = requestAnimationFrame(this.startMatching)
    }
}