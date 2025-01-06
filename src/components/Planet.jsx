/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/models/Planet.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('./models/Planet.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Planet_3.geometry} material={materials.Atlas} scale={100} />
    </group>
  )
}

useGLTF.preload('./models/Planet.glb')
