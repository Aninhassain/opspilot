"use client"

import { useEffect, useRef } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { OrbitControls, useGLTF, useTexture, useAnimations } from "@react-three/drei"
import { Suspense } from "react"

function Dog() {
  const model = useGLTF("/models/dog.drc.glb")
  const materialsApplied = useRef(false)

  useThree(({ camera, scene, gl }) => {
    camera.position.z = 0.55
    gl.toneMapping = THREE.ReinhardToneMapping
    gl.outputColorSpace = THREE.SRGBColorSpace
  })

  const { actions } = useAnimations(model.animations, model.scene)
  useEffect(() => {
    if (actions["Take 001"]) {
      actions["Take 001"].play()
    }
  }, [actions])

  const [normalMap, sampleMatCap] = useTexture([
    "/dog_normals.jpg",
    "/matcap/mat-2.png",
  ]).map((texture) => {
    texture.flipY = false
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  })

  const [branchMap, branchNormalMap] = useTexture([
    "/branches_diffuse.jpeg",
    "/branches_normals.jpeg",
  ]).map((texture) => {
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  })

  useEffect(() => {
    if (!materialsApplied.current && model.scene) {
      const dogMaterial = new THREE.MeshMatcapMaterial({
        normalMap: normalMap,
        matcap: sampleMatCap,
      })

      const branchMaterial = new THREE.MeshMatcapMaterial({
        normalMap: branchNormalMap,
        matcap: branchMap,
      })

      model.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.name.includes("DOG")) {
            child.material = dogMaterial
          } else {
            child.material = branchMaterial
          }
        }
      })

      materialsApplied.current = true
    }
  }, [model.scene, normalMap, sampleMatCap, branchMap, branchNormalMap])

  return (
    <>
      <primitive
        object={model.scene}
        position={[0.25, -0.55, 0]}
        rotation={[0, Math.PI / 3.9, 0]}
      />
      <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={1} />
      <OrbitControls />
    </>
  )
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#8B4513" />
    </mesh>
  )
}

export function DogScene() {
  return (
    <div className="absolute inset-0 -z-10 opacity-50">
      <Canvas>
        <Suspense fallback={<LoadingFallback />}>
          <Dog />
        </Suspense>
      </Canvas>
    </div>
  )
}
