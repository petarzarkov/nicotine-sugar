/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as THREE from "three";
import React, { Suspense, useRef } from "react";
import { Canvas, GroupProps, useFrame, useThree } from "@react-three/fiber";
import { Preload, Image as ImageImpl } from "@react-three/drei";
import { ScrollControls, Scroll, useScroll } from "./ScrollControls";
import { Group } from "three";

import "./styles.css";

function Image(props: any) {
  const ref = useRef<any>();
  const group = useRef<Group>();
  const data = useScroll();
  useFrame((state, delta) => {
    if (group.current) {
      group.current.position.z = THREE.MathUtils.damp(group.current.position.z, Math.max(0, data.delta * 50), 4, delta);
    }
    if (ref.current) {
      ref.current.material.grayscale = THREE.MathUtils.damp(ref?.current?.material.grayscale as number, Math.max(0, 1 - data.delta * 1000), 4, delta);
    }
  });
  return (
    <group ref={group}>
      <ImageImpl ref={ref} {...props} />
    </group>
  );
}

function Page({ m = 0.4, urls, ...props }: { m?: number; urls: string[] } & GroupProps) {
  const { width } = useThree((state) => state.viewport);
  const w = width < 10 ? 1.5 / 3 : 1 / 3;
  return (
    <group {...props}>
      <Image position={[-width * w, 0, -1]} scale={[width * w - m * 2, 5, 1]} url={urls[0]} />
      <Image position={[0, 0, 0]} scale={[width * w - m * 2, 5, 1]} url={urls[1]} />
      <Image position={[width * w, 0, 1]} scale={[width * w - m * 2, 5, 1]} url={urls[2]} />
    </group>
  );
}

function Pages() {
  const { width } = useThree((state) => state.viewport);
  return (
    <>
      <Page position={[-width * 1, 0, 0]} urls={["src/assets/images/trip1.jpg", "src/assets/images/trip2.jpg", "src/assets/images/trip3.jpg"]} />
      <Page position={[width * 0, 0, 0]} urls={["src/assets/images/img1.jpg", "src/assets/images/img2.jpg", "src/assets/images/img3.jpg"]} />
      <Page position={[width * 1, 0, 0]} urls={["src/assets/images/img4.jpg", "src/assets/images/img5.jpg", "src/assets/images/img6.jpg"]} />
      <Page position={[width * 2, 0, 0]} urls={["src/assets/images/trip1.jpg", "src/assets/images/trip2.jpg", "src/assets/images/trip3.jpg"]} />
      <Page position={[width * 3, 0, 0]} urls={["src/assets/images/img1.jpg", "src/assets/images/img2.jpg", "src/assets/images/img3.jpg"]} />
      <Page position={[width * 4, 0, 0]} urls={["src/assets/images/img4.jpg", "src/assets/images/img5.jpg", "src/assets/images/img6.jpg"]} />
      <Page position={[width * 5, 0, 0]} urls={["src/assets/images/trip4.jpg", "src/assets/images/img1.jpg", "src/assets/images/trip3.jpg"]} />
    </>
  );
}

export function InfiniteScroll() {
  return (
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ScrollControls infinite horizontal damping={4} pages={4} distance={1}>
          <Scroll>
            <Pages />
          </Scroll>
          <Scroll html>
            <h1 style={{ position: "absolute", top: "10vh", left: "25vw" }}>peace</h1>
            <h1 style={{ position: "absolute", top: "10vh", left: "125vw" }}>hi</h1>
            <h1 style={{ position: "absolute", top: "10vh", left: "225vw" }}>to the</h1>
            <h1 style={{ position: "absolute", top: "10vh", left: "325vw" }}>place of</h1>
          </Scroll>
        </ScrollControls>
        <Preload />
      </Suspense>
    </Canvas>
  );
}
