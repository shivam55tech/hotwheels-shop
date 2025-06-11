import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as THREE from 'three';

function CarCustomizer() {
  const { productId } = useParams();
  const mountRef = useRef(null);
  const navigate = useNavigate();
  const [color, setColor] = useState('#ff0000');

  useEffect(() => {
    // Copy the ref value to a local variable
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Set dimensions based on the container size.
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;

    // Initialize scene, camera, and renderer.
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    currentMount.appendChild(renderer.domElement);

    // Create a simple model (a cube) representing the car.
    const geometry = new THREE.BoxGeometry(2, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color });
    const car = new THREE.Mesh(geometry, material);
    scene.add(car);

    // Animation loop for rendering
    const animate = () => {
      requestAnimationFrame(animate);
      car.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup function using the captured variable 'currentMount'
    return () => {
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, [color]); // If you add more dependencies, include them here.

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleBuy = () => {
    navigate('/checkout', { state: { productId, color } });
  };

  return (
    <div>
      <h2>Customize Your Car (Product ID: {productId})</h2>
      <div
        style={{ width: '600px', height: '400px', border: '1px solid #ccc' }}
        ref={mountRef}
      ></div>
      <div style={{ marginTop: '20px' }}>
        <label>
          Select Color:{' '}
          <input type="color" value={color} onChange={handleColorChange} />
        </label>
      </div>
      <button onClick={handleBuy} style={{ marginTop: '20px' }}>
        Buy Customized Car
      </button>
    </div>
  );
}

export default CarCustomizer;
