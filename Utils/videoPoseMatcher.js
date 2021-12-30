import anglesMeasure from "./anglesMeasure"

class VideoPoseMatcher {
    constructor(detector1, detector2) {
        this.referenceDetector = detector1
        this.userDetector = detector2
        this.startMatching = this.startMatching.bind(this)
        this.ELBOW_THRESHOLD = 40
        this.SHOULDER_THRESHOLD = 10
        this.BACK_THRESHOULD = 10
    }

    async startMatching() {
        let refId
        const [
            referencePoses,
            userPoses
        ] = await Promise.all([
            this.referenceDetector.getPoseKeypoints(),
            this.userDetector.getPoseKeypoints()
        ])

        try {
            const
                referenceAngleElbow = anglesMeasure.elbowAngle(referencePoses[0]),
                userAngleElbow = anglesMeasure.elbowAngle(userPoses[0])

            document.getElementById('angle').innerText = Math.round(Math.abs(userAngleElbow-referenceAngleElbow))

            this.userDetector.camera.drawCtx();
            if (userPoses && userPoses.length > 0) {
                    const isCorrect = Math.abs(userAngleElbow - referenceAngleElbow) <= this.ELBOW_THRESHOLD
                    this.userDetector.camera.drawResults(userPoses, isCorrect);
                }
                this.referenceDetector.camera.drawCtx();
                if (referencePoses && referencePoses.length > 0) {
                    this.referenceDetector.camera.drawResults(referencePoses, true);
                }
        } catch (err) {
            console.error(err)
        }

        refId = requestAnimationFrame(this.startMatching)
    }
}

export default VideoPoseMatcher