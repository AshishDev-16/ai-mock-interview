import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function Ball({ width = '100%', height = '100%' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create three balls
    const ballGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const ballMaterials = [
      new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 100 }),
      new THREE.MeshPhongMaterial({ color: 0x00ff00, shininess: 100 }),
      new THREE.MeshPhongMaterial({ color: 0x0000ff, shininess: 100 })
    ];

    const balls = ballMaterials.map((material, index) => {
      const ball = new THREE.Mesh(ballGeometry, material);
      ball.position.set(Math.cos(index * Math.PI * 2 / 3), Math.sin(index * Math.PI * 2 / 3), 0);
      return ball;
    });

    const ballGroup = new THREE.Group();
    balls.forEach(ball => ballGroup.add(ball));
    scene.add(ballGroup);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Position camera
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      ballGroup.rotation.x += 0.01;
      ballGroup.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width, height, position: 'absolute', zIndex: -1 }} />;
}

export default Ball;
