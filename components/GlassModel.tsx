"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import * as THREE from "three";

function Blob() {
    const mesh = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const { clock } = state;
        if (mesh.current) {
            // Slow, hypnotic rotation
            mesh.current.rotation.x = clock.getElapsedTime() * 0.2;
            mesh.current.rotation.y = clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            <Sphere args={[1, 128, 128]} ref={mesh} scale={1.5}>
                <MeshDistortMaterial
                    color="#ffffff"
                    speed={3}
                    distort={0.4}
                    radius={1}
                    metalness={0.9}
                    roughness={0.1}
                    emissive="#00ffaa"
                    emissiveIntensity={0.1}
                />
            </Sphere>
        </Float>
    );
}

export function Experience() {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00ffaa" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#7b5cff" />
                <Blob />
            </Canvas>
        </div>
    );
}