import * as THREE from 'three';
import Experience from "./Experience.js";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        
        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
        this.setRayCaster();
    }

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000
        );
        this.scene.add(this.perspectiveCamera);
        //this.perspectiveCamera.position.z = 10;
        this.perspectiveCamera.position.set (-2, 2, 10);

    }

    createOrthographicCamera(){
        this.frustum = 5;
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustum)/2,
            (this.sizes.aspect * this.sizes.frustum)/2,
            this.sizes.frustum/2,
            -this.sizes.frustum/2,
            -100,
            100
        );
        this.scene.add(this.orthographicCamera);
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;

        this.controls.enableRotate = true;


        this.controls.mouseButtons = {
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.ROTATE
        }

    }

    setRayCaster() {
        this.raycaster = new THREE.Raycaster();
        this.mouseposition = mousePosition;
        //this.raycaster.setFromCamera(this.mouseposition, this.perspectiveCamera);
        //this.intersects = this.raycaster.intersectObjects(scene.chidren);
    }

    


    resize() {
        // Updating Perspective Camera on Resize
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        // Updating Orthographic Camera on Resize
        this.orthographicCamera.left = 
            (-this.sizes.aspect * this.sizes.frustum)/2;
        this.orthographicCamera.right =
            (this.sizes.aspect * this.sizes.frustum)/2;
        this.orthographicCamera.top = this.sizes.frustum/2;
        this.orthographicCamera.bottom = -this.sizes.frustum/2;
        this.orthographicCamera.updateProjectionMatrix();

    }

    update() {
        this.controls.update();
        this.raycaster.setFromCamera(this.mouseposition, this.perspectiveCamera);

    }
}

export const mousePosition = new THREE.Vector2();

window.addEventListener('mousemove', function(e) {
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = - (e.clientY / window.innerHeight) * 2 + 1; 
});

