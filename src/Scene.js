/*
  Auto-generated by Spline
*/

import React, { useState } from 'react';
import useSpline from '@splinetool/r3f-spline';
import { PerspectiveCamera , useVideoTexture } from '@react-three/drei';
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three"; 
import url from './video.mp4';
import { gsap } from 'gsap';

export default function Scene({ ...props }) {
  const { nodes, materials } = useSpline('https://prod.spline.design/YKkINuKNUvMwTLEz/scene.splinecode')
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = url;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  })
  const { camera } = useThree()
  useFrame((state, delta) => {
    document.querySelector("#sculpt-button").onclick = function() {
      console.log("cambio");
        gsap.fromTo("#slr", {autoAlpha: 0}, {autoAlpha: 1.0, duration: 1});
        //camera.rotation.set(0, 0, 0);
        gsap.to(camera.position,  {
          x: () => 50,
          y: () => 30,
          z: () => 70,
          duration: 0.5
        })
        console.log(camera.position);
        //camera.lookAt(60, 30, 0);
        camera.rotation.set(0, -.2 ,0);
    }
    document.querySelector("#screen-button").onclick = function() {
      console.log("cambio");
        gsap.fromTo("#slr", {autoAlpha: 0}, {autoAlpha: 1.0, duration: 1});
        gsap.to(camera.position,  {
          x: () => -80,
          y: () => 40,
          z: () => 70,
          duration: 0.5
        })
        camera.rotation.set( 0, .3, 0)
    }   
  })
  console.log(camera.position);
  return (
    <>
      <color attach="background" args={['#fceadc']} />
      <group {...props} dispose={null}>
        <mesh
          name="ScreenBackToMenu 2"
          geometry={nodes['ScreenBackToMenu 2'].geometry}
          material={materials['ScreenBackToMenu 2 Material']}
          castShadow
          receiveShadow
          position={[-70.2, -8.31, -15.41]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={0.15}
        />
        <mesh
          name="EsferaBackToMenu"
          geometry={nodes.EsferaBackToMenu.geometry}
          material={materials['EsferaBackToMenu Material']}
          castShadow
          receiveShadow
          position={[109.37, -13.13, 41.78]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={0.15}
        />
        <PerspectiveCamera
          name="Camera"
          makeDefault={true}
          far={100000}
          near={5}
          fov={45}
          position={[-30.39, 199.97, 412.38]}
          rotation={[-0.42, -0.1, -0.05]}
          scale={1}
        />
        <group name="untitled">
          <mesh
            name="Cube"
            geometry={nodes.Cube.geometry}
            material={nodes.Cube.material}
            castShadow
            receiveShadow
            position={[45.73, -26.11, -117.11]}
          />
          <mesh
            name="detalles"
            geometry={nodes.detalles.geometry}
            material={nodes.detalles.material}
            castShadow
            receiveShadow
            position={[83.79, 19.04, -3.81]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={4.22}
          />
          <mesh
            name="base"
            geometry={nodes.base.geometry}
            material={nodes.base.material}
            castShadow
            receiveShadow
            position={[83.79, 19.04, -3.81]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={4.22}
          />
          <group name="Computer" position={[-76.18, 25.62, -60.94]} rotation={[-Math.PI, 0.82, -Math.PI]} scale={6}>
            <mesh
              name="Cube021"
              geometry={nodes.Cube021.geometry}
              material={nodes.Cube021.material}
              castShadow
              receiveShadow
            />
            <mesh
              name="Cube021_1"
              geometry={nodes.Cube021_1.geometry}
              material={[nodes.Cube021_1.material]}
              castShadow
              receiveShadow
              position={[0, 0, 0]}
            />
            <mesh geometry={nodes.Cube021_1.geometry}>
              <meshStandardMaterial color="white" />
            </mesh>
            <mesh rotation={[0, 7.86, 0]} position={[-0.25, 1, 0]}>
              <planeGeometry args={[19, 10]} />
              <meshStandardMaterial emissive={"white"} side={THREE.DoubleSide}>
              <videoTexture attach="map" args={[video]} />
              <videoTexture attach="emissiveMap" args={[video]} />
              </meshStandardMaterial>
            </mesh>
          </group>
          <group name="Body" rotation={[-Math.PI, 0.82, Math.PI / 2]} scale={[1, 3.39, 3.39]}>
            <mesh
              name="Plane014"
              geometry={nodes.Plane014.geometry}
              material={nodes.Plane014.material}
              castShadow
              receiveShadow
            />
            <mesh
              name="Plane014_1"
              geometry={nodes.Plane014_1.geometry}
              material={nodes.Plane014_1.material}
              castShadow
              receiveShadow
            />
            <mesh
              name="Plane014_2"
              geometry={nodes.Plane014_2.geometry}
              material={nodes.Plane014_2.material}
              castShadow
              receiveShadow
            />
          </group>
        </group>
        <directionalLight
          name="Directional Light"
          castShadow
          intensity={0.7}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={-10000}
          shadow-camera-far={100000}
          shadow-camera-left={-500}
          shadow-camera-right={500}
          shadow-camera-top={500}
          shadow-camera-bottom={-500}
          position={[200, 300, 300]}
        />
        <hemisphereLight name="Default Ambient Light" intensity={0.75} color="#eaeaea" />
      </group>
    </>
  )
}


