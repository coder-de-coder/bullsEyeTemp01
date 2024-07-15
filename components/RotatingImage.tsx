'use client';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';

const RotatingImage: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    console.log('Component mounted');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
      console.log('Renderer appended');
    }

    const loader = new GLTFLoader();
    let model: THREE.Group | undefined;

    loader.load(
      '/models/3d.glb',
      (gltf) => {
        model = gltf.scene;
        scene.add(model);
        console.log('Model loaded and added to scene');

        // Adjust the model position and scale if necessary
        model.position.set(-1, -1, -1);
        model.scale.set(2, 2, 2);

        // Add a light to the scene
        const light = new THREE.DirectionalLight(0xFFD700, 10);
        light.position.set(5, 5, 5);
        scene.add(light);
      },
      undefined,
      (error) => {
        console.error('An error happened', error);
      }
    );

    camera.position.z = 5;

    let rotating = true;
    let mouseDown = false;
    let rotationSpeed = 0.01;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const animate = () => {
      if (rotating && model) {
        model.rotation.y += rotationSpeed;
      }
      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };

    animate();
    console.log('Animation started');

    const handleMouseDown = (event: MouseEvent) => {
      mouseDown = true;
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
      rotating = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (mouseDown && model) {
        const deltaX = event.clientX - lastMouseX;
        const deltaY = event.clientY - lastMouseY;
        model.rotation.y += deltaX * 0.01;
        model.rotation.x += deltaY * 0.01;
        lastMouseX = event.clientX;
        lastMouseY = event.clientY;
      }
    };

    const handleMouseUp = () => {
      mouseDown = false;
      rotating = true;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('resize', handleResize);

    return () => {
      console.log('Component unmounted');
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} />;
};

export default RotatingImage;
