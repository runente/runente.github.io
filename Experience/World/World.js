import * as THREE from 'three';
import Experience from '../Experience.js';
import Environment from './Environment.js';

import Room from './Room.js';
import Floor from './Floor.js';

export default class World {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;


        this.resources.on('ready', () => {
            this.environment = new Environment();
            this.room = new Room();
            this.floor = new Floor();

            this.scene.add(testBox);
            testBox.rotation.y = 95;
            testBox.position.x = -2.3;
            testBox.position.y = 1.5;
            testBox.position.z = -1.5;
            testBox.name = 'theBox';

            this.testBox = testBox;


            this.scene.add(groundBox);
            groundBox.rotation.y = 95;
            groundBox.position.x = 0;
            groundBox.position.y = -0.4;
            groundBox.position.z = -0.5;
            groundBox.name = 'theGround';

            this.testBox = groundBox;


            this.scene.add(ballBox);
            ballBox.rotation.y = 95;
            ballBox.position.x = 3;
            ballBox.position.y = 0.6;
            ballBox.position.z = -0.5;
            ballBox.name = 'theBall';

            this.ballBox = ballBox;
     
        });
    }

    resize() {}

    update() {
        if (this.room) {
            this.room.update();
        }
    }

    
}

const testObj = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 4, 8),
    new THREE.MeshLambertMaterial({
      color: 0xff00ff
    })
  );

 
const testBox = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 1),
    new THREE.MeshLambertMaterial({
      color: 0xff00ff,
      transparent: true,
      opacity: 0.2
    })
);

const groundBox = new THREE.Mesh(
    new THREE.BoxGeometry(9, 1, 9),
    new THREE.MeshLambertMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.2
    })
);

const ballBox = new THREE.Mesh(
    new THREE.BoxGeometry(3, 1.4, 1.4),
    new THREE.MeshLambertMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.2
    })
);

