import anglesMeasure from "../../anglesMeasure"

const IdealAnglesAsan1 = {
    left_elbow: 190,
    left_shoulder: 343,
    left_hip: 109,
    left_knee: 169,
    right_elbow: 190,
    right_shoulder: 343,
    right_hip: 109,
    right_knee: 169
}

const IdealAnglesAsan2 = {
    left_elbow: 148,
    left_shoulder: 208,
    left_hip: 22,
    left_knee: 25,
    right_elbow: 148,
    right_shoulder: 208,
    right_hip: 22,
    right_knee: 25
}

const IdealAnglesAsan3 = {
    left_elbow: 28,
    left_shoulder: 343,
    left_hip: 182,
    left_knee: 177,
    right_elbow: 32,
    right_shoulder: 352,
    right_hip: 116,
    right_knee: 29
}

const IdealAnglesAsan4 = {
    left_elbow: 177,
    left_shoulder: 34,
    left_hip: 185,
    left_knee: 276,
    right_elbow: 180,
    right_shoulder: 30,
    right_hip: 189,
    right_knee: 275
}

const asanMatcher = (idealAngles) => (pose) => {
    let userAngles = {};
    userAngles["left_elbow"] = anglesMeasure.leftElbowAngle(pose)
    userAngles["left_shoulder"] = anglesMeasure.leftShoulderAngle(pose)
    userAngles["left_hip"] = anglesMeasure.leftHipAngle(pose)
    userAngles["left_knee"] = anglesMeasure.leftKneeAngle(pose)
    userAngles["right_elbow"] = anglesMeasure.rightElbowAngle(pose)
    userAngles["right_shoulder"] = anglesMeasure.rightShoulderAngle(pose)
    userAngles["right_hip"] = anglesMeasure.rightHipAngle(pose)
    userAngles["right_knee"] = anglesMeasure.rightKneeAngle(pose)


    let percentMatch = Object.keys(userAngles).reduce((acc, e) => {
        if (!userAngles[e]) return acc + (100 / 8);
        let result1 = 100 - Math.abs(idealAngles[e] - userAngles[e]);
        let result2 = 100 - Math.abs(360 - (idealAngles[e] - userAngles[e]))
        const result = Math.max(result1, result2)
        if (result > 100) return acc + (100 / 8);
        if (result < 0) return acc;
        return acc + (result / 8)
    }, 0)

    return percentMatch
}

export default {
    asan1Matcher: asanMatcher(IdealAnglesAsan1),
    asan2Matcher: asanMatcher(IdealAnglesAsan2),
    asan3Matcher: asanMatcher(IdealAnglesAsan3),
    asan4Matcher: asanMatcher(IdealAnglesAsan4)
}