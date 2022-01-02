
import * as THREE from 'three'

const keypoints_MAP = {
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

function _2dTo3D(p1, p2, len) {
    const z = Math.sqrt(Math.abs(Math.pow(len, 2) - Math.pow(p2.x - p1.x, 2) - Math.pow(p2.y - p1.y, 2)))
    return [
        {
            'x': p1.x,
            'y': p1.y,
            'z': 0
        },
        {
            'x': p2.x,
            'y': p2.y,
            'z': -z
        }
    ]
}

export default function poseToAngle(pose, lengths) {
    if(!pose) return undefined;
    const rightArm = _2dTo3D(pose.keypoints[keypoints_MAP['right_shoulder']], pose.keypoints[keypoints_MAP['right_elbow']], lengths['ARM'])
    let referenceVector = new THREE.Vector3(1, 0, 0)

    let thetaVector = new THREE.Vector3(rightArm[1].x - rightArm[0].x, rightArm[1].y - rightArm[0].y, 0)
    const rightArmTheta = referenceVector.angleTo(thetaVector)

    let phiVector = new THREE.Vector3(rightArm[1].x - rightArm[0].x, 0, rightArm[1].z - rightArm[0].z)
    const rightArmPhi = referenceVector.angleTo(phiVector)


    const rightForeArm = _2dTo3D(pose.keypoints[keypoints_MAP['right_elbow']], pose.keypoints[keypoints_MAP['right_wrist']], lengths['FOREARM'])

    thetaVector = new THREE.Vector3(rightForeArm[1].x - rightForeArm[0].x, rightForeArm[1].y - rightForeArm[0].y, 0)
    const rightForeArmTheta = referenceVector.angleTo(thetaVector)
    
    phiVector = new THREE.Vector3(rightForeArm[1].x - rightForeArm[0].x, 0, rightForeArm[1].z - rightForeArm[0].z)
    const rightForeArmPhi = referenceVector.angleTo(phiVector)
    
    
    referenceVector = new THREE.Vector3(-1, 0, 0)
    const leftArm = _2dTo3D(pose.keypoints[keypoints_MAP['left_shoulder']], pose.keypoints[keypoints_MAP['left_elbow']], lengths['ARM'])
    
    thetaVector = new THREE.Vector3(leftArm[1].x - leftArm[0].x, leftArm[1].y - leftArm[0].y, 0)
    const leftArmTheta = referenceVector.angleTo(thetaVector)
    
    phiVector = new THREE.Vector3(leftArm[1].x - leftArm[0].x, 0, leftArm[1].z - leftArm[0].z)
    const leftArmPhi = referenceVector.angleTo(phiVector)
    
    
    const leftForeArm = _2dTo3D(pose.keypoints[keypoints_MAP['left_elbow']], pose.keypoints[keypoints_MAP['left_wrist']], lengths['FOREARM'])
    
    thetaVector = new THREE.Vector3(leftForeArm[1].x - leftForeArm[0].x, leftForeArm[1].y - leftForeArm[0].y, 0)
    const leftForeArmTheta = referenceVector.angleTo(thetaVector)
    
    phiVector = new THREE.Vector3(leftForeArm[1].x - leftForeArm[0].x, 0, leftForeArm[1].z - leftForeArm[0].z)
    const leftForeArmPhi = referenceVector.angleTo(phiVector)
    

    return ({
        right: {
            arm: {
                theta: rightArmTheta,
                phi: rightArmPhi
            },
            foreArm: {
                theta: rightForeArmTheta,
                phi: rightForeArmPhi
            }
        },
        left: {
            arm: {
                theta: leftArmTheta,
                phi: leftArmPhi
            },
            foreArm: {
                theta: leftForeArmTheta,
                phi: leftForeArmPhi
            }
        }
    })

}

