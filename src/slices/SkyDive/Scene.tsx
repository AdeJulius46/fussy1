"use client"
import FloatingCan from '@/component/FloatingCan'
import { Cloud, Clouds, Environment, OrbitControls } from '@react-three/drei'
import React, { useRef } from 'react'
import * as THREE from "three"
import { Text } from '@react-three/drei'
import { Content } from '@prismicio/client'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import gsap from "gsap"
// import { ScrollTrigger } from "gsap-trial/all"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react"
// import { useStore } from "@/hooks/useStore"


gsap.registerPlugin(useGSAP,ScrollTrigger)

type SkyDiveProps = {
    sentence: string | null;
    flavor: Content.SkyDiveSliceDefaultPrimary["flavor"];
  };
  

export default function Scene({sentence, flavor }: SkyDiveProps) {
    const groupRef =useRef<THREE.Group>(null)
    const canRef =useRef<THREE.Group>(null)
    const cloud1Ref =useRef<THREE.Group>(null)
    const cloud2Ref =useRef<THREE.Group>(null)
    const cloudsRef =useRef<THREE.Group>(null)
    const wordsRef =useRef<THREE.Group>(null)


    const ANGLE =  75 *(Math.PI/ 180)
     const getxPosition =  (distance: number ) => distance * Math.cos (ANGLE)
     const getYPosition =  (distance: number ) => distance * Math.sin (ANGLE )

     const getXYposition = (distance:number) =>({
      x:getxPosition(distance),
      y:getYPosition(-1 * distance)
     })


     useGSAP(()=>{
      if(
        !cloud1Ref.current ||
        !canRef.current ||
        !wordsRef.current ||
        !cloudsRef.current ||
        !cloud2Ref.current

      )
       return;



      //  set initial position

       gsap.set(cloudsRef.current.position, ({z:10}))
       gsap.set(canRef.current.position, {
        ...getXYposition(-4)
       });



       gsap.set(
        wordsRef.current.children.map((word) => word.position),
        { ...getXYposition(7), z: 2 },
      );

      // SPinning 
        gsap.to(canRef.current.rotation,({
          y: Math.PI * 2,
          duration: 1.7,
          repeat : -1,
          ease: "none"
        }))


        //  infinit scroll

        const DISTANCE =15;
        const DURATION = 6;


        gsap.set([cloud2Ref.current.position, cloud1Ref.current.position],
          {
      
            ...getXYposition(DISTANCE)
          }
        )


        gsap.to(cloud1Ref.current.position, {
          y: `+=${getYPosition(DISTANCE * 2)}`,
          x: `+=${getxPosition(DISTANCE * -2)}`,
          ease: "none",
          repeat: -1,
          duration: DURATION,
        });
    
        gsap.to(cloud2Ref.current.position, {
          y: `+=${getYPosition(DISTANCE * 2)}`,
          x: `+=${getxPosition(DISTANCE * -2)}`,
          ease: "none",
          repeat: -1,
          delay: DURATION / 2,
          duration: DURATION,
        });



        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".skydive",
            pin: true,
            start: "top top",
            end: "+=2000",
            scrub: 1.5,
          },
        });
    
        scrollTl
          .to("body", {
            backgroundColor: "#C0F0F5",
            overwrite: "auto",
            duration: 0.1,
          })
          .to(cloudsRef.current.position, { z: 0, duration: 0.3 }, 0)
          .to(canRef.current.position, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "back.out(1.7)",
          })
          .to(
            wordsRef.current.children.map((word) => word.position),
            {
              keyframes: [
                { x: 0, y: 0, z: -1 },
                { ...getXYposition(-7), z: -7 },
              ],
              stagger: 0.3,
            },
            0,
          )
          .to(canRef.current.position, {
            ...getXYposition(4),
            duration: 0.5,
            ease: "back.in(1.7)",
          })
          .to(cloudsRef.current.position, { z: 7, duration: 0.5 });
     })
    
  return (
    <group  ref={groupRef}>
    <group  rotation={[0,0,0.5]}>
        <FloatingCan  ref={canRef}  rotationIntensity={0}   floatIntensity={3} floatspeed={3} >
          <pointLight intensity={30} color="#8C0413" decay={0.6} />
         </FloatingCan>
    </group>

     <Clouds ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} />
        <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} />
      </Clouds>


        <group   ref={wordsRef}>
            {sentence && <ThreeText sentence={sentence} color='#F97315' />}

        </group>

 {/* <OrbitControls/> */}
             <ambientLight   intensity={2} color="#9DDEFA"/>
        <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />

    </group>
  )
}


function ThreeText({
sentence,
color= "white",
}:{
  sentence: string;
  color?: string;
}){



  const words =sentence.toUpperCase().split(" ");
  const material = new THREE.MeshLambertMaterial();
  const isDesktop = useMediaQuery("(min-width: 950px)", true)

  return words.map((word: string, wordIndex: number)=>(
    <Text   key={`${wordIndex}-${word}`}
      scale={isDesktop ? 1 : .5}
      color={color}
      material={material}
      font='/fonts/Alpino-Variable.woff'
      fontWeight={900}
      anchorX={"center"}
      anchorY={"middle"}
      characters='ABCDEFGHIJKLMOPQRSUVWXYZ...?'
    >  {word}
  

    </Text>))
}