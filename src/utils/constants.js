import * as THREE from 'three';

export const APP_NAME = 'FlavorFlow';
export const LOTTIE_COOKING_ANIMATION_URL = 'https://assets2.lottiefiles.com/packages/lf20_qgqg1x.json';
export const GRAIN_PARTICLE_COUNT = 10000;
export const GRAIN_PARTICLE_SIZE = 0.01;

export const createGrainParticles = (count, size) => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const color1 = new THREE.Color(0xFFD166);
  const color2 = new THREE.Color(0xFF6B6B);
  const color3 = new THREE.Color(0x4ECDC4);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() * 2 - 1) * 10;
    positions[i * 3 + 1] = (Math.random() * 2 - 1) * 10;
    positions[i * 3 + 2] = (Math.random() * 2 - 1) * 10;

    const randColor = Math.random();
    if (randColor < 0.33) {
      color1.toArray(colors, i * 3);
    } else if (randColor < 0.66) {
      color2.toArray(colors, i * 3);
    } else {
      color3.toArray(colors, i * 3);
    }
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: size,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
};