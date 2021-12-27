let camera, detector, rafId, poses

async function predictRecursive() {
    try {
        poses = await detector.estimatePoses(camera.video);
    } catch (error) {
        detector.dispose();
        alert(error);
    }
    camera.drawCtx();
    rafId = requestAnimationFrame(predictRecursive);
}

export default function startDetection(cam, det) {
    camera = cam;
    detector = det;
    predictRecursive();
}