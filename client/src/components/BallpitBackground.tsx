/**
 * BallpitBackground Component
 * 
 * A high-performance 3D background featuring interactive spheres that react to gravity,
 * friction, and user interaction.
 */

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

export interface BallpitProps {
  count?: number;
  colors?: string[];
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  followCursor?: boolean;
  minSize?: number;
  maxSize?: number;
  className?: string;
}

export const BallpitBackground: React.FC<BallpitProps> = ({
  count = 100,
  colors = ['#1A1A1B', '#3B82F6', '#94A3B8'],
  gravity = 0.4,
  friction = 0.998,
  wallBounce = 0.95,
  followCursor = true,
  minSize = 0.5,
  maxSize = 1.0,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const parent = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, parent.clientWidth / parent.clientHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(parent.clientWidth, parent.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const instancedMesh = new THREE.InstancedMesh(geometry, new THREE.MeshStandardMaterial(), count);
    scene.add(instancedMesh);

    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();
    const positions: THREE.Vector3[] = [];
    const velocities: THREE.Vector3[] = [];
    const sizes: number[] = [];

    for (let i = 0; i < count; i++) {
      const size = THREE.MathUtils.randFloat(minSize, maxSize);
      sizes.push(size);
      
      const pos = new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(20),
        THREE.MathUtils.randFloatSpread(20),
        THREE.MathUtils.randFloatSpread(5)
      );
      positions.push(pos);
      velocities.push(new THREE.Vector3(THREE.MathUtils.randFloatSpread(0.1), THREE.MathUtils.randFloatSpread(0.1), 0));

      matrix.makeScale(size, size, size);
      matrix.setPosition(pos);
      instancedMesh.setMatrixAt(i, matrix);
      
      color.set(colors[Math.floor(Math.random() * colors.length)]);
      instancedMesh.setColorAt(i, color);
    }

    const mouse = new THREE.Vector2();
    const onMouseMove = (event: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);

      for (let i = 0; i < count; i++) {
        const pos = positions[i];
        const vel = velocities[i];
        const size = sizes[i];

        vel.y -= gravity * 0.01;
        vel.multiplyScalar(friction);
        pos.add(vel);

        if (followCursor && i === 0) {
          const targetX = mouse.x * 10;
          const targetY = mouse.y * 10;
          pos.x += (targetX - pos.x) * 0.1;
          pos.y += (targetY - pos.y) * 0.1;
        }

        if (pos.x > 10) { pos.x = 10; vel.x *= -wallBounce; }
        if (pos.x < -10) { pos.x = -10; vel.x *= -wallBounce; }
        if (pos.y > 10) { pos.y = 10; vel.y *= -wallBounce; }
        if (pos.y < -10) { pos.y = -10; vel.y *= -wallBounce; }

        matrix.makeScale(size, size, size);
        matrix.setPosition(pos);
        instancedMesh.setMatrixAt(i, matrix);
      }
      instancedMesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = parent.clientWidth / parent.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(parent.clientWidth, parent.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [count, colors, gravity, friction, wallBounce, followCursor, minSize, maxSize]);

  return (
    <div ref={containerRef} className={`w-full h-full absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
