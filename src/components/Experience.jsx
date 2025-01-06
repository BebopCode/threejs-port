import { OrbitControls, Float, Line, useScroll, PerspectiveCamera  } from "@react-three/drei";
import { useFrame} from '@react-three/fiber';

import { Background } from "./Background";
import { Spaceship } from "./Spaceship";
import { Star } from "./Star";
import { useMemo, useRef } from "react";
import * as THREE from "three"
export const Experience = () => {
    const LINE_NB_POINTS = 2000;
    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, 0, 10),
            new THREE.Vector3(-2, 0, 20),
            new THREE.Vector3(-3, 0, 30),
            new THREE.Vector3(0, 0, 40),
            new THREE.Vector3(5, 0, 50),
            new THREE.Vector3(7, 0, 60),
            new THREE.Vector3(5, 0, 70),
            new THREE.Vector3(0, 0, 80),
            new THREE.Vector3(0, 0, 90),
            new THREE.Vector3(0, 0, 100),
        ],
            false,
            "catmullrom",
            0.5)
    })

    const linePoints = useMemo(() => {
        return curve.getPoints(LINE_NB_POINTS);
    }, [curve]);
    const shape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, -0.2);
        shape.lineTo(0, 0.2);
        return shape;
    }, [curve]);

    const cameraGroup = useRef();
    const camera = useRef();
    const scroll = useScroll();

    useFrame((_state, delta) =>{
        const curPointIndex = Math.min(
            Math.round(scroll.offset * linePoints.length),
            linePoints.length - 1
        )
        const curPoint = linePoints[curPointIndex]
        cameraGroup.current.position.lerp(curPoint, delta * 24)
        if (camera.current){
            const lastPoint = linePoints[linePoints.length - 1]
            camera.current.lookAt(lastPoint);
        }
          
    })
    return (
        <>
            <OrbitControls enableZoom={false} />
            <group ref={cameraGroup}>
            <Background />
            <PerspectiveCamera ref={camera}  position={[0, 0, -3]} fov={40} makeDefault />
            <Float floatIntensity={2} speed={2}>
                <Spaceship
                    scale={[0.2, 0.2, 0.2]}
                    position-y={-0.5}
                />
            </Float>
            </group>
          
            <group position-y={-1}>
                <Line
                    points={linePoints}
                    color={"white"}
                    opacity={0.7}
                    transparent
                    lineWidth={16}
                />
                <mesh>
                    <extrudeGeometry
                        args={[
                            shape,
                            {
                                steps: LINE_NB_POINTS,
                                bevelEnabled: false,
                                extrudePath: curve,

                            },
                        ]}
                    />
                    <meshStandardMaterial color={"white"} opacity={0.7} transparent />
                </mesh>
            </group>
       
        </>
    );
}