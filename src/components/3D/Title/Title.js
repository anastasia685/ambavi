import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Title = (props) => {
  const canvasRef = useRef();

  const [isReady, setIsReady] = useState(false);

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
      sizes.width < 400 ? 75 : 55,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.z = 35;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: false,
      antialias: true,
    });
    //renderer.setClearColor('#040d24');
    //renderer.shadowMapEnabled = true;
    //renderer.shadowMapType = THREE.PCFSoftShadowMap;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    //const controls = new OrbitControls(camera, canvasRef.current);

    /**
     * Handle window resize
     */
    const resizeHandler = () => {
      //UPDATE SIZES
      sizes.width = document.documentElement.clientWidth;
      sizes.height = document.documentElement.clientHeight;

      //UPDATE CAMERA
      //camera.fov = (180 * (2 * Math.atan(sizes.height / 2 / 1000))) / Math.PI;
      camera.fov = sizes.width < 400 ? 75 : 55;
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
    if (canvasRef.current)
      canvasRef.current.addEventListener('mousemove', mouseMoveHandler);
    const touchMoveHandler = (event) => {
      cursor.x = event.touches[0].clientX / sizes.width - 0.5;
      cursor.y = -(event.touches[0].clientY / sizes.height - 0.5);
    };
    if (canvasRef.current)
      canvasRef.current.addEventListener('touchmove', touchMoveHandler);

    const manager = new THREE.LoadingManager();
    manager.onLoad = () => {
      //console.log('Loading complete!');
      //props.onLoad();
      setIsReady(true);
    };
    const loader = new SVGLoader(manager);
    loader.load(
      // resource URL
      'svg/Ambavi1.svg',
      // called when the resource is loaded
      function (data) {
        const paths = data.paths;
        const group = new THREE.Group();
        group.scale.multiplyScalar(0.08);
        group.scale.y *= -1;

        for (let i = 0; i < paths.length; i++) {
          const path = paths[i];

          const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setStyle(path.userData.style.fill),
            opacity: path.userData.style.fillOpacity,
            transparent: false,
            side: THREE.DoubleSide,
            depthWrite: false,
            wireframe: false,
          });

          const shapes = SVGLoader.createShapes(path);

          for (let j = 0; j < shapes.length; j++) {
            const shape = shapes[j];
            const geometry = new THREE.ShapeGeometry(shape);
            const mesh = new THREE.Mesh(geometry, material);
            group.add(mesh);
          }
        }
        new THREE.Box3()
          .setFromObject(group)
          .getCenter(group.position)
          .multiplyScalar(-1);

        scene.add(group);
      }
    );

    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshBasicMaterial()
    );
    //scene.add(mesh);

    /**
     * Animate
     */
    const clock = new THREE.Clock();
    const animate = () => {
      //UPDATE CAMERA
      camera.position.x = Math.sin(cursor.x * Math.PI * 0.5) * 10;
      camera.position.z = Math.cos(cursor.x * Math.PI * 0.5) * 12 + 35;
      camera.position.y = cursor.y * 22;
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      //controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

    const node = canvasRef.current;
    return () => {
      window.removeEventListener('resize', resizeHandler);
      if (node) {
        node.removeEventListener('mousemove', mouseMoveHandler);
        node.removeEventListener('touchmove', touchMoveHandler);
      }
    };
  }, [isReady]);

  return (
    <>
      {isReady ? (
        <div
          style={{
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
            height: '100vh',
          }}
          ref={props.containerRef}
        >
          <canvas ref={canvasRef} />
        </div>
      ) : (
        <div
          style={{
            backgroundColor: 'black',
            height: '100vh',
            width: '100%',
            scrollSnapAlign: 'start',
            scrollSnapStop: 'always',
          }}
        ></div>
      )}
    </>
  );
};

export default Title;
