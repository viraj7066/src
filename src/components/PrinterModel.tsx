import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PrinterModel: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.2}>
      <torusKnotGeometry args={[0.6, 0.25, 128, 16]} />
      <meshStandardMaterial
        color="#FF8C42"
        metalness={0.6}
        roughness={0.2}
        emissive="#FF7C32"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

export default PrinterModel;