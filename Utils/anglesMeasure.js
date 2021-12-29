
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
            .map(e => pose?.keypoints?.find(query(e)))

    return getAngle(arr);
}

export default {
    elbowAngle
}