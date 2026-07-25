"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { OrbitControls, useGLTF, useTexture, useAnimations } from "@react-three/drei"
import { Suspense } from "react"

function Dog() {
  const model = useGLTF("/models/dog.drc.glb")
  const materialsApplied = useRef(false)
  const dogRef = useRef<THREE.Group>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)

  useThree(({ camera, gl }) => {
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

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Animate based on mouse and scroll
  useFrame((state) => {
    if (dogRef.current) {
      // Smooth rotation based on mouse position
      const targetRotationX = mousePosition.y * 0.3
      const targetRotationY = mousePosition.x * 0.3 + Math.PI / 3.9

      dogRef.current.rotation.x = THREE.MathUtils.lerp(
        dogRef.current.rotation.x,
        targetRotationX,
        0.05
      )
      dogRef.current.rotation.y = THREE.MathUtils.lerp(
        dogRef.current.rotation.y,
        targetRotationY,
        0.05
      )

      // Parallax effect based on scroll
      const scrollOffset = scrollY * 0.001
      dogRef.current.position.y = THREE.MathUtils.lerp(
        dogRef.current.position.y,
        -0.55 + scrollOffset,
        0.05
      )

      // Subtle floating animation
      const time = state.clock.getElapsedTime()
      dogRef.current.position.y += Math.sin(time * 2) * 0.002
    }
  })

  return (
    <>
      <primitive
        ref={dogRef}
        object={model.scene}
        position={[0.25, -0.55, 0]}
        rotation={[0, Math.PI / 3.9, 0]}
      />
      <directionalLight position={[0, 5, 5]} color={0xffffff} intensity={1} />
      <OrbitControls enableZoom={false} enablePan={false} />
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
