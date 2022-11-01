import { Suspense, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useProgress } from "@react-three/drei";
import Scene from "./Scene";
import { Overlay } from "./Overlay";

export default function App() {
  const target = useRef();
  const { active, loaded, total } = useProgress();
  const isLoaded = !active && total > 0 && loaded === total;
  return (
    <main ref={target}>
    <Suspense fallback={null}>
      <Canvas
        shadows
        flat
        linear
        onCreated={(state) => state.events.connect(target.current)}
      >
        <Scene />
      </Canvas>
      {isLoaded && <Overlay />}
    </Suspense>
  </main>
  );
}
