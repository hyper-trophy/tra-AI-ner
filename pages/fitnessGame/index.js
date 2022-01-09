import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper'
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs-core';
import * as PoseDetector from '@tensorflow-models/pose-detection'
import anglesMeasure from '../../Utils/anglesMeasure'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import pose2D from '../../Utils/pose2DtoAngle'
import styles from '../../styles/HomePage.module.scss'
import { Camera, poseDetector } from '../../Utils';

function FitnessGame() {
    const [
        videoRef,
        canvasRef,
        canvasContainer,
        canvasRefIdeal,
        canvasContainerIdeal,
        videoRefIdeal,
        suggestionRef,
        gameOverRef
    ] = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

    useEffect(() => {
        (async () => {
            let scene, renderer, camera, model, skeleton, clock, controls, pose, lengths, angles,
                vs, up, lk, rightArm, rightForeArm, leftArm, leftForeArm, obstacles = [], spawner,
                rightFin, leftFin, refId, stopped = false
            let detector = await PoseDetector.createDetector(PoseDetector.SupportedModels.MoveNet, { modelType: PoseDetector.movenet.modelType.SINGLEPOSE_LIGHTNING })
            let video = document.getElementById('video')

            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                throw new Error(
                    'Browser API navigator.mediaDevices.getUserMedia not available');
            }

            const videoConfig = {
                'audio': false,
                'video': {
                    facingMode: 'user',
                }
            };

            const stream = await navigator.mediaDevices.getUserMedia(videoConfig);

            video.srcObject = stream;

            await new Promise((resolve) => {
                video.onloadedmetadata = () => {
                    resolve(video);
                };
            });

            video.play();

            // const mycamera = new Camera(videoRef.current, canvasRef.current);
            // await mycamera.setupCamera();
            // const USER_VIDEO = true
            // const detector = new poseDetector(mycamera, USER_VIDEO)
            // await detector.setupDetector()
            // detector.startDetection()

            while (true) {
                try {
                    pose = await detector.estimatePoses(video);
                    // pose = await detector.getPoseKeypoints()
                    let angle = anglesMeasure.shoulderAngle(pose[0]);
                    // console.log(angle)
                    // document.getElementById('info').innerText = angle
                    if (angle > 260 && angle < 290) {
                        let
                            shoulder = pose[0].keypoints[anglesMeasure.KEYPOINT_MAP['right_shoulder']],
                            wrist = pose[0].keypoints[anglesMeasure.KEYPOINT_MAP['right_wrist']],
                            elbow = pose[0].keypoints[anglesMeasure.KEYPOINT_MAP['right_elbow']]

                        let ARM = Math.sqrt(Math.pow(shoulder.x - elbow.x, 2) + Math.pow(shoulder.y - elbow.y, 2))
                        let FOREARM = Math.sqrt(Math.pow(elbow.x - wrist.x, 2) + Math.pow(elbow.y - wrist.y, 2))
                        lengths = {
                            ARM,
                            FOREARM
                        }
                        video.style.position = "absolute"
                        video.style.transform = `scale(0.5)`
                        video.style.bottom = `-55px`
                        video.style.right = `-105px`
                        console.log("len : ", lengths, "\nshoulder : ", shoulder, "\nwridt : ", wrist, "\nelbow : ", elbow)
                        init();
                        break;
                    }
                } catch (error) {
                    console.log(error)
                }
                await new Promise(r => setTimeout(r, 100))
            }

            // init()

            function IntervalTimer(callback, interval) {
                var timerId, startTime, remaining = 0;
                var state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed

                this.pause = function () {
                    if (state != 1) return;

                    remaining = interval - (new Date() - startTime);
                    window.clearInterval(timerId);
                    state = 2;
                };

                this.resume = function () {
                    if (state != 2) return;

                    state = 3;
                    window.setTimeout(this.timeoutCallback, remaining);
                };

                this.timeoutCallback = function () {
                    if (state != 3) return;

                    callback();

                    startTime = new Date();
                    timerId = window.setInterval(callback, interval);
                    state = 1;
                };

                startTime = new Date();
                timerId = window.setInterval(callback, interval);
                state = 1;
            }

            document.onkeyup = (e) => {
                if (e.code === 'Space' && stopped == true) {
                    gameOverRef.current.style.visibility = "hidden" 
                    spawner.resume()
                    stopped = false;
                    // animate()
                }
            }

            function spawnObjstacles(params) {
                const geometry = new THREE.SphereGeometry(0.5, 16, 16);
                const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
                const sphere = new THREE.Mesh(geometry, material);
                sphere.position.set(THREE.MathUtils.randFloat(-10, 10), THREE.MathUtils.randFloat(-5, 5), -40)
                // sphere.position.set(0, 0, -10)
                scene.add(sphere);
                sphere.visible = true
                console.log("obs spawned")
                obstacles.push({
                    sphere,
                    timeStamp: clock.getElapsedTime(),
                    final: new THREE.Vector3(THREE.MathUtils.randFloat(-0.03, 0.03), THREE.MathUtils.randFloat(0.1, 0.2), 0.1)
                })
            }

            function updateObstacles() {
                const currTime = clock.getElapsedTime()
                obstacles.map(ob => {
                    const obTime = ob.timeStamp
                    const elapsed = currTime - obTime
                    const scaleFactor = (25 - elapsed) / 25
                    const curr = ob.sphere.position, fin = ob.final
                    // const pos = ob.sphere.position.clone().sub(ob.final.clone()).multiplyScalar(scaleFactor)
                    ob.sphere.position.set((curr.x) * scaleFactor + fin.x, (curr.y) * scaleFactor + fin.y, (curr.z) * scaleFactor + fin.z)
                    // ob.sphere.position.multiplyScalar(scaleFactor)
                })
            }

            function checkCollision() {
                let
                    rightFinPos = new THREE.Vector3(),
                    leftFinPos = new THREE.Vector3(),
                    obs = obstacles[0],
                    obsPos = obs?.sphere.position.clone(),
                    obsRadius = obs?.sphere.geometry.parameters.radius

                rightFin.getWorldPosition(rightFinPos)
                leftFin.getWorldPosition(leftFinPos)

                const
                    rightLen = obsPos?.clone().sub(rightFinPos).length(),
                    leftLen = obsPos?.clone().sub(leftFinPos).length()

                if (obs && (rightLen < obsRadius + 0.1 || leftLen < obsRadius + 0.1)) {
                    console.log("obstacle diappeared")
                    scene.remove(obs.sphere)
                    console.log(obstacles)
                    obstacles = obstacles.slice(1)
                    console.log(obstacles)
                } else if (obs && obsPos.z >= 0.1) {
                    console.log("in gameover", refId)
                    gameOverRef.current.style.visibility = "visible"
                    obstacles.map(ob => scene.remove(ob?.sphere))
                    obstacles = []
                    spawner.pause()
                    // window.cancelAnimationFrame(refId)
                    stopped = true
                }

            }

            function init() {
                THREE.VertexNormalsHelper = VertexNormalsHelper
                window.THREE = THREE
                const container = document.getElementById('container');

                camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
                camera.position.set(0, 5, 1);
                camera.lookAt(0, 100, 0);

                const texture = new THREE.TextureLoader().load("/starsHD.jpg");
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(4, 1);

                clock = new THREE.Clock();
                clock.getElapsedTime()

                scene = new THREE.Scene();
                const meshBack = new THREE.Mesh(new THREE.SphereGeometry(120, 64, 64), new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide }));
                scene.add(meshBack)
                // scene.background = texture
                scene.background = new THREE.Color(0x000000);
                // scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);

                const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
                hemiLight.position.set(0, 20, 0);
                scene.add(hemiLight);

                const dirLight = new THREE.DirectionalLight(0xcb9700);
                dirLight.position.set(- 3, 10, - 10);
                dirLight.castShadow = true;
                dirLight.shadow.camera.top = 2;
                dirLight.shadow.camera.bottom = - 2;
                dirLight.shadow.camera.left = - 2;
                dirLight.shadow.camera.right = 2;
                dirLight.shadow.camera.near = 0.1;
                dirLight.shadow.camera.far = 40;
                scene.add(dirLight);


                const normalTexture = new THREE.TextureLoader().load("/NormalMap1.png");
                const mesh = new THREE.Mesh(new THREE.SphereGeometry(30, 128, 128), new THREE.MeshStandardMaterial({ color: 0xcb9766, normalMap: normalTexture }));
                mesh.translateY(-30)
                mesh.rotation.x = - Math.PI / 2;
                mesh.receiveShadow = true;
                scene.add(mesh);

                const loader = new GLTFLoader();
                loader.load('/Soldier.glb', function (gltf) {

                    model = gltf.scene;
                    scene.add(model);

                    model.traverse(function (object) {

                        if (object.isMesh) object.castShadow = true;

                    });

                    // model.lookAt(1, 1, 0) shit is working

                    skeleton = new THREE.SkeletonHelper(model);
                    const arrowHelper = new THREE.ArrowHelper((new THREE.Vector3(1, 0, -1)).normalize(), new THREE.Vector3(0, 0, 0), 1, 0xffff00);
                    scene.add(arrowHelper)

                    // skeleton.bones[7].rotation =  arrowHelper.rotation.clone()
                    window.arrowHelper = arrowHelper
                    window.scene = scene
                    window.skeleton = skeleton
                    window.myModel = model
                    window.camera = camera


                    // skeleton.visible = true;
                    scene.add(skeleton);
                    rightArm = skeleton.bones[24]
                    rightForeArm = skeleton.bones[25]
                    leftArm = skeleton.bones[7]
                    leftForeArm = skeleton.bones[8]

                    leftFin = scene.getObjectByName('mixamorigLeftHandIndex2')
                    rightFin = scene.getObjectByName('mixamorigRightHandIndex2')
                    animate();

                });



                renderer = new THREE.WebGLRenderer({ antialias: true });
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.outputEncoding = THREE.sRGBEncoding;
                renderer.shadowMap.enabled = true;
                container.appendChild(renderer.domElement);

                // spawner = setInterval(() => {
                //     spawnObjstacles()
                // }, 5000);
                spawner = new IntervalTimer(spawnObjstacles, 5000)

                controls = new OrbitControls(camera, renderer.domElement);
                controls.update()
            }

            const reverseUp = (bone) => {
                bone.up.x = -bone.up.x
                bone.up.y = -bone.up.y
                bone.up.z = -bone.up.z
            }

            async function animate() {
                pose = await detector.estimatePoses(video)
                // pose = await detector.getPoseKeypoints();
                vs = pose2D.armVectors(pose[0], lengths);

                if (pose[0] && vs) {
                    up = vs.rightArm.clone().cross(vs.rightForeArm.clone());
                    lk = up.clone().cross(vs.rightArm.clone());
                    rightArm.up = vs.rightArm
                    reverseUp(rightArm)
                    rightArm.lookAt(lk.clone().multiplyScalar(-100))


                    lk = up.clone().cross(vs.rightForeArm.clone());
                    rightForeArm.up = vs.rightForeArm
                    reverseUp(rightForeArm)
                    rightForeArm.lookAt(lk.clone().multiplyScalar(-100))


                    up = vs.leftArm.clone().cross(vs.leftForeArm.clone());
                    lk = up.clone().cross(vs.leftArm.clone());
                    leftArm.up = vs.leftArm
                    reverseUp(leftArm)
                    leftArm.lookAt(lk.clone().multiplyScalar(100))


                    lk = up.clone().cross(vs.leftForeArm.clone());
                    leftForeArm.up = vs.leftForeArm
                    reverseUp(leftForeArm)
                    leftForeArm.lookAt(lk.clone().multiplyScalar(100))
                }

                arrowHelper.setDirection(skeleton.bones[24].getWorldDirection(new THREE.Vector3()))

                if (!stopped) {
                    updateObstacles()
                    checkCollision()
                }
                // camera.rotation.z += 10
                controls.update()
                renderer.render(scene, camera);
                refId = requestAnimationFrame(animate);
                window.refId = refId
            }
        })()
    }, []);

    return (
        <>
            <Head>
                <title>three.js webgl - animation - skinning</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
                <style>
                    {
                        `body {
				color: #fff;
				font-family:Monospace;
				font-size:13px;
				text-align:center;

				background-color: #fff;
				margin: 0px;
				overflow: hidden;
			}

			#info {
				position: absolute;
				top: 0px; width: 100%;
				padding: 5px;
			}
            #video {
	            -webkit-transform: scaleX(-1);
	            transform: scaleX(-1);
	            width: auto;
	            height: auto;
            }
        `
                    }
                </style>
            </Head>
            <video id="video"
                playsInline loop autoPlay>
            </video>
            {/* <div className="canvas-wrapper" ref={canvasContainer}>
                <canvas id="output" ref={canvasRef} ></canvas>
                <video id="video"
                    ref={videoRef} playsInline loop autoPlay
                    className={styles.videoElement}>
                </video>
            </div>
            <h1 id="info">hello</h1> */}
            <div ref={gameOverRef} style={{
                position: "absolute",
                paddingTop: "20%",
                pointerEvents: "none",
                top: "0px",
                fontSize: "3rem",
                textAlign: "center",
                width: "100%",
                height: "100%",
                background: "#00000080",
                visibility: "hidden"
            }}>GameOver !<br/><p>press spacebar to continue</p></div>

            <div id="container"></div>
        </>
    )
}

export default FitnessGame