const KEYPOINT_MAP = {
    "nose": 0,
    "left_eye": 1,
    "right_eye": 2,
    "left_ear": 3,
    "right_ear": 4,
    "left_shoulder": 5,
    "right_shoulder": 6,
    "left_elbow": 7,
    "right_elbow": 8,
    "left_wrist": 9,
    "right_wrist": 10,
    "left_hip": 11,
    "right_hip": 12,
    "left_knee": 13,
    "right_knee": 14,
    "left_ankle": 15,
    "right_ankle": 16
}

const calcAngleDegrees = (x, y) => Math.atan2(y, x) * 180 / Math.PI;

const angleBetween3points = (p1, p2, p3) => Math.abs(calcAngleDegrees(p1.y - p2.y, p1.x - p2.x) - calcAngleDegrees(p1.y - p3.y, p1.x - p3.x));

const query = str => el => el.name === str;

const allNull = a => a.reduce((res, curr) => !curr && res, true)

const allNotNull = a => a.reduce((res, curr) => !!curr && res, true)

const sideChooser = el => {
    if (allNull(el)) return 'NULL'
    if (allNotNull(el)) {
        return el.reduce((res, curr, idx) => idx < el.length / 2 ? res + curr.score : res - curr.score, 0) > 0 ? 'LEFT' : 'RIGHT'
    }
    let right = el;
    let left = right.splice(0, el.length / 2);
    if (allNotNull(left))
        return 'LEFT'
    if (allNotNull(right))
        return 'RIGHT'
    return 'NULL'
}

const getAngle = arr => {
    switch (sideChooser(arr)) {
        case 'LEFT':
            return angleBetween3points(arr[0], arr[1], arr[2])
        case 'RIGHT':
            return angleBetween3points(arr[3], arr[4], arr[5])
        default:
            return null
    }
}

const elbowAngle = pose => {
    const arr =
        ['left_elbow', 'left_shoulder', 'left_wrist', 'right_elbow', 'right_shoulder', 'right_wrist']
            .map(e => pose?.keypoints[KEYPOINT_MAP[e]])
    return getAngle(arr);
}

const shoulderAngle = pose => {
    const arr =
        ['left_shoulder', 'left_hip', 'left_elbow', 'right_shoulder', 'right_hip', 'right_elbow']
            .map(e => pose?.keypoints[KEYPOINT_MAP[e]])
    return getAngle(arr);
}

const hipAngle = pose => {
    const arr =
        ['left_hip', 'left_shoulder', 'left_knee', 'right_hip', 'right_shoulder', 'right_knee']
            .map(e => pose?.keypoints[KEYPOINT_MAP[e]])
    return getAngle(arr);
}

const kneeAngle = pose => {
    const arr =
        ['left_knee', 'left_hip', 'left_ankle', 'right_knee', 'right_hip', 'right_ankle']
            .map(e => pose?.keypoints[KEYPOINT_MAP[e]])
    return getAngle(arr);
}


const leftElbowAngle = pose => {
    const arr =
        ['left_elbow', 'left_shoulder', 'left_wrist']
            .map(e => pose?.keypoints[KEYPOINT_MAP[e]])
    return angleBetween3points(arr[0], arr[1], arr[2]);
}

const leftShoulderAngle = pose => {
    const arr =
        ['left_shoulder', 'left_hip', 'left_elbow']
            .map(e => pose?.keypoints[KEYPOINT_MAP[e]])
    return angleBetween3points(arr[0], arr[1], arr[2]);
}

const leftHipAngle = pose => {
    const arr =
        ['left_hip', 'left_shoulder', 'left_knee']
            .map(e => pose?.keypoints[KEYPOINT_MAP[e]])
    return angleBetween3points(arr[0], arr[1], arr[2]);
}

const leftKneeAngle = pose => {
    const arr =
        ['left_knee', 'left_hip', 'left_ankle']
            .map(e => pose?.keypoints[KEYPOINT_MAP[e]])
    return angleBetween3points(arr[0], arr[1], arr[2]);
}

const rightElbowAngle = pose => {
    const arr =
        ['right_elbow', 'right_shoulder', 'right_wrist']
            .map(e => pose?.keypoints[KEYPOINT_MAP[e]])
    return angleBetween3points(arr[0], arr[1], arr[2]);
}

const rightShoulderAngle = pose => {
    const arr =
        ['right_shoulder', 'right_hip', 'right_elbow']
            .map(e => pose?.keypoints[KEYPOINT_MAP[e]])
    return angleBetween3points(arr[0], arr[1], arr[2]);
}

const rightHipAngle = pose => {
    const arr =
        ['right_hip', 'right_shoulder', 'right_knee']
            .map(e => pose?.keypoints[KEYPOINT_MAP[e]])
    return angleBetween3points(arr[0], arr[1], arr[2]);
}

const rightKneeAngle = pose => {
    const arr =
        ['right_knee', 'right_hip', 'right_ankle']
            .map(e => pose?.keypoints[KEYPOINT_MAP[e]])
    return angleBetween3points(arr[0], arr[1], arr[2]);
}

export default {
    elbowAngle,
    shoulderAngle,
    hipAngle,
    kneeAngle,
    leftElbowAngle,
    leftHipAngle,
    leftShoulderAngle,
    leftKneeAngle,
    rightElbowAngle,
    rightHipAngle,
    rightKneeAngle,
    rightShoulderAngle,
    KEYPOINT_MAP
}