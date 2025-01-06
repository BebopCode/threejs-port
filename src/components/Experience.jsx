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
            new THREE.Vector3(0, 0, -10),
            new THREE.Vector3(-2, 0, -20),
            new THREE.Vector3(-3, 0, -30),
            new THREE.Vector3(0, 0, -40),
            new THREE.Vector3(5, 0, -50),
            new THREE.Vector3(7, 0, -60),
            new THREE.Vector3(5, 0, -70),
            new THREE.Vector3(0, 0, -80),
            new THREE.Vector3(0, 0, -90),
            new THREE.Vector3(0, 0, -100),
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

    var cameraGroup = useRef();
    const scroll = useScroll();

    useFrame((_state, delta) =>{
        const curPointIndex = Math.min(
            Math.round(scroll.offset * linePoints.length),
            linePoints.length - 1
        )
        const curPoint = linePoints[curPointIndex]
        cameraGroup.current.position.lerp(curPoint, delta * 24)
        cameraGroup.current.lookAt(curPoint);
        if (curPoint instanceof THREE.Vector3) {
            console.log("curPoint is a Vector3");
            console.log(curPoint);
          } else {
            console.error("curPoint is NOT a Vector3!");
          }
          
    })
    return (
        <>
            <OrbitControls enableZoom={false} />
            <group ref={cameraGroup}>
            <Background />
            <PerspectiveCamera position={[2, 2, 2]} fov={30} makeDefault />
            <Float floatIntensity={2} speed={2}>
                <Spaceship
                    rotation-y={Math.PI}
                    scale={[0.2, 0.2, 0.2]}
                    position-y={1}
                />
            </Float>
            </group>
          
            <group position-y={-2}>
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
            <Star
                scale={[0.3, 0.3, 0.4]}
                rotation-y={Math.PI / 9}
                position={[2, -0.2, -2]} />
            <Star
                scale={[0.3, 0.3, 0.4]}
                rotation-y={Math.PI / 9}
                position={[2, -0.2, 2]} />
            <Star
                scale={[0.3, 0.3, 0.4]}
                rotation-y={Math.PI / 9}
                position={[2, 4, -2]} />
            <Star
                scale={[0.3, 0.3, 0.4]}
                rotation-y={Math.PI / 9}
                position={[4, -0.2, -2]} />


        </>
    );
}