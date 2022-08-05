import * as THREE from 'three';

import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Resources from './Utils/Resources.js';
import assets from './Utils/assets.js';

import Camera from './Camera.js';
import Renderer from './Renderer.js';

import World from './World/World.js';

import gsap from '../node_modules/gsap/index.js';
import { PerspectiveCamera } from 'three';

export default class Experience {
    static instance  
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.world = new World();


        this.time.on('update', () => {
            this.update();
        });
        this.sizes.on('resize', () => {
            this.resize();
        });

    }

    resize(){
        this.camera.resize();
        this.world.update();
        this.renderer.resize();
    }

    update(){
        this.camera.update();
        this.renderer.update();
        this.world.update();


        this.intersects = this.camera.raycaster.intersectObjects(this.scene.children);
        console.log(this.intersects);

        for(let i = 0; i < this.intersects.length; i++) {

            if(this.intersects[i].object.name === 'theBox') {
                if (mouseDown) {
                    if(!gsap.isTweening(this.camera.perspectiveCamera.position)){
                        gsap.to(this.camera.perspectiveCamera.position,{
                        duration: 1,
                        x: -1.55,
                        y: 0.85,
                        z: 3.3,
                        ease: "power3.inOut",
                        })
                        
                    }
                    this.camera.controls.target.set(0, 0, -30);
                    console.log('pantalla clickeada');
                }
                
            }

            if(this.intersects[i].object.name === 'theGround') {
                if (mouseDown) {
                    if(!gsap.isTweening(this.camera.perspectiveCamera.position)){
                        gsap.to(this.camera.perspectiveCamera.position,{
                        duration: 1,
                        x: -2,
                        y: 2,
                        z: 10,
                        ease: "power3.inOut",
                        })
                        
                    }
                    this.camera.controls.target.set(0, 0, 0);
                    console.log('pantalla clickeada');
                }
            }


            if(this.intersects[i].object.name === 'theBall') {
                if (mouseDown) {
                    if(!gsap.isTweening(this.camera.perspectiveCamera.position)){
                        gsap.to(this.camera.perspectiveCamera.position,{
                        duration: 1,
                        x: -2,
                        y: 1.6,
                        z: 2.3,
                        ease: "power3.inOut",
                        })
                        
                    }
                    this.camera.controls.target.set(5, 0, 0);
                    console.log('pantalla clickeada');
                }
            }

            

            
        }


        console.log(this.camera.perspectiveCamera.position, this.camera.perspectiveCamera.rotation);
    }

}

var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}