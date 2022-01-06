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
import styles from '../../Styles/HomePage.module.scss'
import { Camera, poseDetector } from '../../Utils';

function FitnessGame() {
    const [
        videoRef,
        canvasRef,
        canvasContainer,
        canvasRefIdeal,
        canvasContainerIdeal,
        videoRefIdeal,
        suggestionRef
    ] = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

    useEffect(() => {
        (async () => {
            let scene, renderer, camera, model, skeleton, clock, controls, pose, lengths, angles, vs, up, lk, rightArm, rightForeArm, leftArm, leftForeArm
            // let detector = await PoseDetector.createDetector(PoseDetector.SupportedModels.MoveNet, { modelType: PoseDetector.movenet.modelType.SINGLEPOSE_LIGHTNING })
            // let video = document.getElementById('video')

            // if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            //     throw new Error(
            //         'Browser API navigator.mediaDevices.getUserMedia not available');
            // }

            // const videoConfig = {
            //     'audio': false,
            //     'video': {
            //         facingMode: 'user',
            //     }
            // };

            // const stream = await navigator.mediaDevices.getUserMedia(videoConfig);

            // video.srcObject = stream;

            // await new Promise((resolve) => {
            //     video.onloadedmetadata = () => {
            //         resolve(video);
            //     };
            // });

            // video.play();

            const mycamera = new Camera(videoRef.current, canvasRef.current);
            await mycamera.setupCamera();
            const USER_VIDEO = true
            const detector = new poseDetector(mycamera, USER_VIDEO)
            await detector.setupDetector()
            detector.startDetection()

            while (true) {
                try {
                    // pose = await detector.estimatePoses(video);
                    pose = await detector.getPoseKeypoints()
                    let angle = anglesMeasure.shoulderAngle(pose[0]);
                    // console.log(angle)
                    document.getElementById('info').innerText = angle
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

            function init() {
                THREE.VertexNormalsHelper = VertexNormalsHelper
                window.THREE = THREE
                const container = document.getElementById('container');

                camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
                camera.position.set(1, 5, - 3);
                camera.lookAt(0, 1, 0);

                const texture = new THREE.TextureLoader().load("/starsHD.jpg");
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(4, 1);

                clock = new THREE.Clock();

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


                const normalTexture = new THREE.TextureLoader().load("/normalMap.png");
                const mesh = new THREE.Mesh(new THREE.SphereGeometry(30, 128, 128), new THREE.MeshPhongMaterial({ color: 0xcb9766, normalMap: normalTexture }));
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


                    skeleton.visible = true;
                    scene.add(skeleton);
                    rightArm = skeleton.bones[24]
                    rightForeArm = skeleton.bones[25]
                    leftArm = skeleton.bones[7]
                    leftForeArm = skeleton.bones[8]
                    animate();

                });



                renderer = new THREE.WebGLRenderer({ antialias: true });
                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(window.innerWidth, window.innerHeight);
                renderer.outputEncoding = THREE.sRGBEncoding;
                renderer.shadowMap.enabled = true;
                container.appendChild(renderer.domElement);

                controls = new OrbitControls(camera, renderer.domElement);
                controls.update()
            }

            const resetRotation = () =>
                [7, 8, 24, 25].map(e => skeleton.bones[e].setRotationFromEuler(new THREE.Euler(0, 0, 0)))

            const reverseUp = (bone) => {
                bone.up.x = -bone.up.x
                bone.up.y = -bone.up.y
                bone.up.z = -bone.up.z
            }

            async function animate() {
                pose = await detector.getPoseKeypoints();
                vs = pose2D.armVectors(pose[0], lengths);

                if (pose[0] && vs) {
                    up = vs.rightArm.clone().cross(vs.rightForeArm.clone());
                    lk = up.clone().cross(vs.rightArm.clone());
                    rightArm.up = vs.rightArm
                    reverseUp(rightArm)
                    rightArm.lookAt(lk.clone().multiplyScalar(100))


                    lk = up.clone().cross(vs.rightForeArm.clone());
                    rightForeArm.up = vs.rightForeArm
                    reverseUp(rightForeArm)
                    rightForeArm.lookAt(lk.clone().multiplyScalar(100))


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


                // // console.log(angles)
                // if (angles && skeleton) {
                //     resetRotation();
                //     skeleton.bones[7].rotation.x = angles.left.arm.phi
                //     skeleton.bones[7].rotation.z = angles.left.arm.theta

                //     skeleton.bones[8].rotation.x = (angles.left.foreArm.phi - skeleton.bones[7].rotation.x)
                //     skeleton.bones[8].rotation.z = -(angles.left.foreArm.theta - skeleton.bones[7].rotation.z)

                //     skeleton.bones[24].rotation.x = angles.right.arm.phi
                //     skeleton.bones[24].rotation.z = -angles.right.arm.theta

                //     skeleton.bones[25].rotation.x = -(angles.right.foreArm.phi - skeleton.bones[24].rotation.x)
                //     skeleton.bones[25].rotation.z = (angles.right.foreArm.theta - skeleton.bones[24].rotation.z)
                // }
                arrowHelper.setDirection(skeleton.bones[24].getWorldDirection(new THREE.Vector3()))
                controls.update()
                renderer.render(scene, camera);
                requestAnimationFrame(animate);
            }
        })()
    });
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
            {/* <video id="video"
                playsInline loop autoPlay>
            </video> */}
            <div className="canvas-wrapper" ref={canvasContainer}>
                <canvas id="output" ref={canvasRef} ></canvas>
                <video id="video"
                    ref={videoRef} playsInline loop autoPlay
                    className={styles.videoElement}>
                </video>
            </div>
            <h1 id="info">hello</h1>
            <div id="container"></div>
        </>
    )
}

export default FitnessGame