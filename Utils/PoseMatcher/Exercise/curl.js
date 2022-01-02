import anglesMeasure from "../../anglesMeasure";

export default function curlChecker(referencePose, userPose, suggestionRef) {
    const
        ELBOW_THRESHOLD = 40,
        SHOULDER_THRESHOLD = 30,
        HIP_THRESHOLD = 10

    const
        refElbowAngle = anglesMeasure.elbowAngle(referencePose),
        refShoulderAngle = anglesMeasure.shoulderAngle(referencePose),
        refHipAngle = anglesMeasure.hipAngle(referencePose),
        userElbowAngle = anglesMeasure.elbowAngle(userPose),
        userShoulderAngle = anglesMeasure.shoulderAngle(userPose),
        userHipAngle = anglesMeasure.hipAngle(userPose)

    if (userHipAngle && Math.abs(userHipAngle - refHipAngle) > HIP_THRESHOLD) {
        suggestionRef.current.style.color = 'red'
        suggestionRef.current.innerText = `Your Back is bending too much!`
        return false;
    }

    if (userShoulderAngle && Math.abs(userShoulderAngle - refShoulderAngle) > SHOULDER_THRESHOLD) {
        suggestionRef.current.style.color = 'red'
        suggestionRef.current.innerText = `your elbow is moving forward, put it inline with torso`
        return false;
    }

    if (userElbowAngle && Math.abs(userElbowAngle - refElbowAngle) > ELBOW_THRESHOLD) {
        suggestionRef.current.style.color = 'red'
        suggestionRef.current.innerText = `Try to be in sync with the trainer`
        return false;
    }

    suggestionRef.current.style.color = 'green'
    suggestionRef.current.innerText = `Good job !`

    return true;
}