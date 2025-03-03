/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/models/spaceship.glb 
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Spaceship(props) {
  const { nodes, materials } = useGLTF('./models/spaceship.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Spaceship_RaeTheRedPanda.geometry} material={materials.Atlas} scale={50} />
    </group>
  )
}

useGLTF.preload('./models/spaceship.glb')
