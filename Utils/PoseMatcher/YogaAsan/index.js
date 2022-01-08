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
        // console.log("angles :",
        //     anglesMeasure.leftElbowAngle(userPoses[0]),
        //     anglesMeasure.leftShoulderAngle(userPoses[0]),
        //     anglesMeasure.leftHipAngle(userPoses[0]),
        //     anglesMeasure.leftKneeAngle(userPoses[0]),
        //     anglesMeasure.rightElbowAngle(userPoses[0]),
        //     anglesMeasure.rightShoulderAngle(userPoses[0]),
        //     anglesMeasure.rightHipAngle(userPoses[0]),
        //     anglesMeasure.rightKneeAngle(userPoses[0]),
        // )

        try {
            this.userDetector.camera.drawCtx();
            if (userPoses && userPoses.length > 0) {
                const accuracy = this.checker(userPoses[0], this.suggestionRef)
                this.suggestionRef.current.innerText = Math.round(accuracy)
                this.userDetector.camera.drawResults(userPoses, accuracy > 66);
            }
        } catch (err) {
            console.error(err)
        }

        refId = requestAnimationFrame(this.startMatching)
    }
}

export default YogaPoseMatcher