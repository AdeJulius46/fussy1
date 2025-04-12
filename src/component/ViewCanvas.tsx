"use client"

import { Canvas } from "@react-three/fiber"
import {Perf} from "r3f-perf"
// import { SodaCan } from "./SodaCan"
import { Environment, Float, View } from "@react-three/drei"
import FloatingCan from "./FloatingCan"
import { Suspense } from "react"
import dynamic from "next/dynamic"


const Loader = dynamic(
  () => import("@react-three/drei").then((mod) => mod.Loader),
  { ssr: false },
);

type Props = {}

export default function ViewCanvas({}: Props) {
  return (
    <>
    <Canvas
    style={
      {
        position:"fixed",
        top:0,
        left:"50%",
        transform:"translateX(-50%)",
        overflow:"hidden",
        pointerEvents:"none",
        zIndex:30,
      }
    }
      shadows
      dpr={[1, 1.5]}
      gl={{antialias:true}}
      camera={{
        fov:30,
      }}
      >
    
     {/* <mesh rotation={[.5,.5,0]}   position={[1,0,0]}>
        <boxGeometry />
        <meshStandardMaterial   color={"hotpink"} />
     </mesh> */}
     <Suspense  fallback={null}> 

  <View.Port/>
     </Suspense>
      {/* <FloatingCan />
     <Environment  files="/hdr/lobby.hdr"  environmentIntensity={1.5}/> */}
     {/* <ambientLight intensity={2} />
     <spotLight intensity={3} position={[1,1,1]} /> */}
     <Perf />
    </Canvas>

    <Loader />
     </>

  )} 
