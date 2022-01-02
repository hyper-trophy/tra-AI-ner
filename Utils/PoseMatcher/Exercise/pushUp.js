import anglesMeasure from "../../anglesMeasure";

export default function pushUpChecker(referencePose, userPose) {
    const
        ELBOW_THRESHOLD = 40,
        SHOULDER_THRESHOLD = 30,
        HIP_THRESHOLD = 20
        KNEE_THRESHOLD = 10

    const
        refElbowAngle = anglesMeasure.elbowAngle(referencePose),
        refShoulderAngle = anglesMeasure.shoulderAngle(referencePose),
        refHipAngle = anglesMeasure.hipAngle(referencePose),
        refKneeAngle = anglesMeasure.kneeAngle(referencePose),
        userElbowAngle = anglesMeasure.elbowAngle(userPose),
        userShoulderAngle = anglesMeasure.shoulderAngle(userPose),
        userHipAngle = anglesMeasure.hipAngle(userPose),
        userKneeAngle = anglesMeasure.kneeAngle(userPose)

    if (userKneeAngle && Math.abs(userKneeAngle - refKneeAngle) > KNEE_THRESHOLD){
        //show knee fix message
        return false;
    }

    if (userHipAngle && Math.abs(userHipAngle - refHipAngle) > HIP_THRESHOLD){
        //show hip fix message
        return false;
    }
    
    if(userShoulderAngle && Math.abs(userShoulderAngle - refShoulderAngle) > SHOULDER_THRESHOLD){
        //show shoulder fix
        return false;
    }

    if(userElbowAngle && Math.abs(userElbowAngle - refElbowAngle)>ELBOW_THRESHOLD){
        //tell to sync with the training video
        return false;
    }

    return true;
}