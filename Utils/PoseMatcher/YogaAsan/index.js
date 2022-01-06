import anglesMeasure from "../../anglesMeasure"

class YogaPoseMatcher {
    constructor(detector2, checker, suggestionRef) {
        this.userDetector = detector2
        this.checker = checker
        this.startMatching = this.startMatching.bind(this)
        this.suggestionRef = suggestionRef
    }

    async startMatching() {
        let refId
        const userPoses = await this.userDetector.getPoseKeypoints()


        try {
            this.userDetector.camera.drawCtx();
            if (userPoses && userPoses.length > 0) {
                const accuracy = this.checker(userPoses[0], this.suggestionRef)
                this.suggestionRef.current.innerText = Math.round(accuracy)
                this.userDetector.camera.drawResults(userPoses, accuracy>66);
            }
        } catch (err) {
            console.error(err)
        }

        refId = requestAnimationFrame(this.startMatching)
    }
}

export default YogaPoseMatcher