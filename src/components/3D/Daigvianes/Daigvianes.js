import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import vertexShader from '../../shaders/daigvianes/vertex.glsl';
import fragmentShader from '../../shaders/daigvianes/fragment.glsl';

const Daigvianes = () => {
  const canvasRef = useRef();
  useEffect(() => {
    /**
     * Init
     */
    const sizes = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
    const cursor = { x: 0, y: 0 };
    const scene = new THREE.Scene();
    const fov =
      (180 * (2 * Math.atan(document.documentElement.clientWidth / 2 / 1000))) /
      Math.PI;
    const camera = new THREE.PerspectiveCamera(
      fov,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: false,
    });
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Handle window resize
     */
    const resizeHandler = () => {
      //UPDATE SIZES
      sizes.width = document.documentElement.clientWidth;
      sizes.height = document.documentElement.clientHeight;

      //UPDATE CAMERA
      camera.fov = (180 * (2 * Math.atan(sizes.height / 2 / 1000))) / Math.PI;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      //UPDATE RENDERER
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', resizeHandler);

    /**
     * Handle mouse movement
     */
    const mouseMoveHandler = (event) => {
      cursor.x = event.clientX / sizes.width - 0.5;
      cursor.y = -(event.clientY / sizes.height - 0.5);
    };
    canvasRef.current.addEventListener('mousemove', mouseMoveHandler);

    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      wireframe: false,
      uniforms: {
        uTime: { value: 0 },
        uCounter: { value: 0.0 },
      },
    });
    const mesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(10, 8, 128, 128),
      material
    );
    scene.add(mesh);

    /**
     * Animate
     */

    let counter = 0.0;

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      //UPDATE CAMERA
      camera.position.x = Math.sin(cursor.x * Math.PI * 0.5) * 0.5;
      camera.position.z = Math.cos(cursor.x * Math.PI * 0.5) * 1.5 + 5;
      camera.position.y = cursor.y * 1.2;
      camera.lookAt(mesh.position);

      material.uniforms.uTime.value = elapsedTime;
      counter += 0.01;
      material.uniforms.uCounter.value = Math.ceil(1);

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

    const node = canvasRef.current;
    return () => {
      window.removeEventListener('resize', resizeHandler);
      if (node) node.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} />
      <div
        style={{
          position: 'absolute',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1 style={{ fontFamily: '/' }}>ჩვენ შესახებ</h1>
        <p
          style={{
            fontFamily: 'BPGMikheilStefane',
            textAlign: 'center',
            width: '60vw',
          }}
        >
          ამბავი აუდიო-ვიზუალური პროექტია, რომელიც აერთიანებს ქართულ ფოლკლორულ
          თემებს, თანამედროვე ელექტრონულ ჟღერადობებსა და ვიზუალურ ხელოვნებას.
          ამბავი 2014 წელს შეიქმნა ანრი ლომიას, ტორესა მოსის და ნათი იდენის
          მიერ. ლეიბლი: Future Records.
        </p>
      </div>
    </>
  );
};

export default Daigvianes;
