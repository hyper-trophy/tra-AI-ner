import anglesMeasure from "../anglesMeasure"

class PushUpCounter  {
    constructor(detector2, counterRef) {
        this.userDetector = detector2
        this.startCounting = this.startCounting.bind(this)
        this.counterRef = counterRef
        this.partialRep = false
        this.repCount = 0
    }

    async startCounting() {
        let refId
        const userPoses = await this.userDetector.getPoseKeypoints()

        try {
            this.userDetector.camera.drawCtx();
            if (userPoses && userPoses.length > 0) {
                const elbowAngle = anglesMeasure.elbowAngle(userPoses[0])
                if(!this.partialRep && (elbowAngle < 80 || elbowAngle > 280))   
                    this.partialRep = true
                if(this.partialRep && (elbowAngle > 150 && elbowAngle < 200)){
                    this.repCount+=1
                    this.counterRef.current.innerText = `Reps: ${this.repCount}`
                    this.partialRep = false
                }
                this.userDetector.camera.drawResults(userPoses, true);
            }
        } catch (err) {
            console.error(err)
        }

        refId = requestAnimationFrame(this.startCounting)
    }
}

export default PushUpCounter