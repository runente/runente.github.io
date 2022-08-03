import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from 'dat.gui';
import gsap from "../../node_modules/gsap/index.js"


import nebula from '../img/nebula.jpg';
import stars from '../img/stars.jpg';



const monkeyUrl = new URL ('../assets/monkey.glb', import.meta.url);
//let url = new URL( '../../static/assets/monkey.glb', import.meta.url );
//let url = URL( monkeyUrl, import.meta.url );
//url = "" + url;




const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set( 20, 20, 20 );
camera.rotation.order = 'YXZ';
camera.rotation.y = - Math.PI / 4;
camera.rotation.x = Math.atan( - 1 / Math.sqrt( 2 ) );

//const orbit = new OrbitControls(camera, document.body);
const orbit = new OrbitControls(camera, renderer.domElement);

const explore = $('.explore');
var explorer = false;

//explore

//explore.click(() => {   
//    if(!gsap.isTweening(camera.position)){
//      gsap.to(camera.position,{
//        duration: 1,
//        z: explorer ? 20 : 4,
//        ease: "power3.inOut",
//      })
//      explore[0].innerHTML = explorer ? "start exploring" : "go back";
//      explorer = !explorer;
//    }
//});



// to disable zoom
orbit.enableZoom = true;
// to disable rotation
orbit.enableRotate = false;
// to disable pan
orbit.enablePan = true;


orbit.mouseButtons = {
	LEFT: THREE.MOUSE.PAN,
	MIDDLE: THREE.MOUSE.DOLLY,
	RIGHT: THREE.MOUSE.ROTATE
}


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//camera.position.set(0, 2, 5);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();    
const boxMaterial = new THREE.MeshStandardMaterial({color: 0x00FF00});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);


//box.rotation.x = 5;
//box.rotation.y = 5;

box.position.x = 1.5;
box.position.y = 1.5;
box.position.z = 1.5;

//box.scale.set(3, 3, 3);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;


const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const sphereGeometry = new THREE.SphereGeometry(4, 10, 10);
const sphereMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x0000FF,
    wireframe: false
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.castShadow = true;

sphere.position.set(-10, 5, 0);

const ambientLight = new THREE.AmbientLight(0x333333);  
scene.add(ambientLight);

//const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
//scene.add(directionalLight);
//directionalLight.position.set(-30, 50, 0);
//directionalLight.castShadow = true;
//directionalLight.shadow.camera.bottom = -12;


//const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
//scene.add(dLightHelper);

//const dLightShadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
//scene.add(dLightShadowHelper);

const spotLight = new THREE.SpotLight(0xFFFFFF);
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

//scene.fog = new THREE.Fog(0xFFFFFF, 0, 200);
scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);

renderer.setClearColor(0xFFF9BD);


const textureLoader = new THREE.TextureLoader();
//scene.background = textureLoader.load(stars);
//const cubeTextureLoader = new THREE.CubeTextureLoader();
//scene.background = cubeTextureLoader.load([
//    nebula,
//    nebula,
//    stars,
//    stars,
//    stars,
//    stars
//]);


window.addEventListener('mousedown', cameraAnimation);

const tl = gsap.timeline();
const duration = 8;
const ease = 'none';
let animationIsFinished = false;

function cameraAnimation () {
    if (!animationIsFinished) {
        animationIsFinished = true;

        tl.to(camera.position, {
            x: 0,
            duration,
            ease
        })

        .to(camera.position, {
            y: 40,
            z: 30, 
            duration,
            ease,
            onUpdate: function () {
                camera.lookAt(0, 0, 0);
            }
        }, 8)

        .to(camera.position, {
            x: -10,
            y: 15,
            z: 10, 
            duration,
            ease,
            onUpdate: function () {
                camera.lookAt(0, 0, 0);
            }
        }, 8)
    }
}



const box2Geometry = new THREE.BoxGeometry(4, 4, 4);
const box2Material = new THREE.MeshBasicMaterial({
    //color: 0x00FF00,
    map: textureLoader.load(nebula)
});
const box2MultiMaterial = [
    new THREE.MeshBasicMaterial({map: textureLoader.load(stars)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(stars)}),  
    new THREE.MeshBasicMaterial({map: textureLoader.load(nebula)}),  
    new THREE.MeshBasicMaterial({map: textureLoader.load(stars)}),  
    new THREE.MeshBasicMaterial({map: textureLoader.load(nebula)}),  
    new THREE.MeshBasicMaterial({map: textureLoader.load(stars)})
];
const box2 = new THREE.Mesh(box2Geometry, box2MultiMaterial);
scene.add(box2);
box2.position.set(0, 15, 10);
// box2.material.map = textureLoader.load(nebula);


const plane2Geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
const plane2Material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    wireframe: true
});
const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
scene.add(plane2);
plane2.position.set(10, 10, 15);

plane2.geometry.attributes.position.array[0] -= 10 * Math.random();
plane2.geometry.attributes.position.array[1] -= 10 * Math.random();
plane2.geometry.attributes.position.array[2] -= 10 * Math.random();
const lastPointZ = plane2.geometry.attributes.position.array.length - 1;
plane2.geometry.attributes.position.array[lastPointZ] -= 10 * Math.random();



const sphere2Geometry = new THREE.SphereGeometry(4);

// const vShader = `
//     void main() {
//         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//     }
// `;

// const fShader = `
//     void main() {
//         gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0);
//     }
// `;

const sphere2Material = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
});
const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
scene.add(sphere2);
sphere2.position.set(-5, 30, 10);

const assetLoader = new GLTFLoader();

assetLoader.load(monkeyUrl.href, function(gltf) {
    const model = gltf.scene;
	scene.add(model);
    model.position.set(0, 3, 0);
}, ( onProgress ) => { 
	console.log(onProgress); 
}, ( onError ) => {
	console.log(onError);
});



const gui = new dat.GUI();

const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01,
    angle: 0.2,
    penumbra: 0,
    intensity: 1    
};

gui.addColor(options, 'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(function(e){
    sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1);

gui.add(options, 'angle', 0, 1);
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'intensity', 0, 1);

let step = 0;

const mousePosition = new THREE.Vector2();

window.addEventListener('mousemove', function(e) {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = - (e.clientY / window.innerHeight) * 2 + 1; 
    
});

const rayCaster = new THREE.Raycaster();
//rayCaster.far = 10000;

const sphereId  = sphere.id;
box2.name = 'theBox';

var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}


function animate (time) {
    //box.rotation.x = time / 1000;
    //box.rotation.y = time / 1000;

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    //sLightHelper.update();

    rayCaster.setFromCamera(mousePosition, camera);
    const intersects = rayCaster.intersectObjects(scene.children);
    //console.log(intersects);

    for(let i = 0; i < intersects.length; i++) {
        if(mouseDown){
            // crikey! isn't she a beauty?   
            if(intersects[i].object.id === sphereId)
            {   
                intersects[i].object.material.color.set(0xFF0000);
                if(!gsap.isTweening(camera.position)){
                    gsap.to(camera.position,{
                    duration: 1,
                    z: explorer ? 20 : 4,
                    ease: "power3.inOut",
                    })
                    //explore[0].innerHTML = explorer ? "start exploring" : "go back";
                    //explorer = !explorer;
                }
                
                //orbit.enablePan = false;
                //origin.enableZoom = false;
            }
        }
        if(intersects[i].object.name === 'theBox') {
            intersects[i].object.rotation.x = time / 1000;
            intersects[i].object.rotation.y = time / 1000;
        }
    }

    plane2.geometry.attributes.position.array[0] = 10 * Math.random();
    plane2.geometry.attributes.position.array[1] = 10 * Math.random();
    plane2.geometry.attributes.position.array[2] = 10 * Math.random();
    plane2.geometry.attributes.position.array[lastPointZ] = 10 * Math.random();
    plane2.geometry.attributes.position.needsUpdate = true;

    
    

    renderer.render(scene, camera);

}

addEventListener('pointerup', (event) => {});


//renderer.render(scene, camera);

renderer.setAnimationLoop(animate);

orbit.addEventListener( "change", event => {  
    //console.log( orbit.object.position ); 
});

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

