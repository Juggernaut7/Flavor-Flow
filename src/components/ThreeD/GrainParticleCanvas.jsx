import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { GRAIN_PARTICLE_COUNT, GRAIN_PARTICLE_SIZE } from '../../utils/constants';

const GrainParticles = ({ count, size }) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(count * 3), { radius: 1.2 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#FFD166"
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const GrainParticleCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 1] }} className="w-full h-full">
      <GrainParticles count={GRAIN_PARTICLE_COUNT} size={GRAIN_PARTICLE_SIZE} />
    </Canvas>
  );
};

export default GrainParticleCanvas;