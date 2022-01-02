import anglesMeasure from "../../anglesMeasure";

export default function curlChecker(referencePose, userPose) {
    const
        ELBOW_THRESHOLD = 40,
        SHOULDER_THRESHOLD = 30,

    const
        refElbowAngle = anglesMeasure.elbowAngle(referencePose),
        refShoulderAngle = anglesMeasure.shoulderAngle(referencePose),
        userElbowAngle = anglesMeasure.elbowAngle(userPose),
        userShoulderAngle = anglesMeasure.shoulderAngle(userPose),

    if (userShoulderAngle && Math.abs(userShoulderAngle - refShoulderAngle) > SHOULDER_THRESHOLD) {
        //show shoulder fix
        return false;
    }

    if (userElbowAngle && Math.abs(userElbowAngle - refElbowAngle) > ELBOW_THRESHOLD) {
        //tell to sync with the training video
        return false;
    }

    return true;
}