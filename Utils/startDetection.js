import anglesMeasurere from './anglesMeasure'

export default function startDetection(camera, detector) {
    let poses = null, rafId
    
    async function renderResult() {
        if (camera.video.readyState < 2) {
            await new Promise((resolve) => {
                camera.video.onloadeddata = () => {
                    resolve(video);
                };
            });
        }
        try {
            poses = await detector.estimatePoses(camera.video);
            console.log(poses[0])
            // console.log(anglesMeasurere.elbowAngle(poses[0]))
        } catch (error) {
            cancelAnimationFrame(rafId)
            // alert(error);
            console.log(error)
        }
        camera.drawCtx();
        if (poses && poses.length > 0) {
            camera.drawResults(poses);
        }
        rafId = requestAnimationFrame(renderResult)
    }

    renderResult();
}