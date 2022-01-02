
class VideoPoseMatcher {
    constructor(detector1, detector2, checker, suggestionRef) {
        this.referenceDetector = detector1
        this.userDetector = detector2
        this.startMatching = this.startMatching.bind(this)
        this.checker = checker
        this.suggestionRef = suggestionRef
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
            this.userDetector.camera.drawCtx();
            if (userPoses && userPoses.length > 0) {
                const isCorrect = this.checker(referencePoses[0], userPoses[0], this.suggestionRef)
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