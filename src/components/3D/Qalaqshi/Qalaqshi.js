import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

import vertexShader from '../../shaders/qalaqshi/vertex.glsl';
import fragmentShader from '../../shaders/qalaqshi/fragment.glsl';
import gsap from 'gsap';
import classes from './Qalaqshi.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faSoundcloud,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

const Qalaqshi = (props) => {
  const canvasRef = useRef();
  const containerRef = useRef();
  const contentRef = useRef();
  useEffect(() => {
    /**
     * Init
     */
    const sizes = {
      width: document.documentElement.clientWidth,
      height: contentRef.current.scrollHeight,
    };
    const cursor = { x: 0, y: 0 };
    const scene = new THREE.Scene();
    /*scene.background = new THREE.Color(0, 0, 0);
    scene.fog = new THREE.Fog(0x00000, 200, 500);*/

    /*const light = new THREE.SpotLight(0xffffff, 0.5, 150);
    light.position.set(0, -200, 0);
    const lightHelper = new THREE.SpotLightHelper(light);
    scene.add(light);
    scene.add(lightHelper);*/

    const fov = (180 * (2 * Math.atan((sizes.height - 4) / 2 / 700))) / Math.PI;
    const camera = new THREE.PerspectiveCamera(
      fov,
      sizes.width / sizes.height,
      0.1,
      750
    );
    camera.position.z = 280;

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
      sizes.height = contentRef.current.scrollHeight;

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
    window.addEventListener('mousemove', mouseMoveHandler);
    const touchMoveHandler = (event) => {
      cursor.x = event.touches[0].clientX / sizes.width - 0.5;
      cursor.y = -(event.touches[0].clientY / sizes.height - 0.5);
    };
    window.addEventListener('touchmove', touchMoveHandler);

    /*const cursorEnterHandler = (event) => {
      if (props.cursorRef && props.cursorRef.current)
        gsap.to(props.cursorRef.current.style, 0, {
          mixBlendMode: 'overlay',
        });

      //props.cursorRef.current.style.mixBlendMode = 'overlay';
    };
    const cursorLeaveHandler = (event) => {
      if (props.cursorRef && props.cursorRef.current)
        gsap.to(props.cursorRef.current.style, 0, {
          mixBlendMode: 'difference',
        });
    };
    containerRef.current.addEventListener('mouseenter', cursorEnterHandler);
    containerRef.current.addEventListener('mouseleave', cursorLeaveHandler);*/

    const mesh = new THREE.Mesh(
      new THREE.BoxBufferGeometry(350, 280, 350),
      new THREE.MeshBasicMaterial({
        wireframe: false,
        color: 0x0000ff,
      })
    );
    //scene.add(mesh);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];

    const alphas = [];
    const pointSizes = [];
    const rotations = [];

    for (let i = 0; i < 4500; i++) {
      const x = Math.random() * 700 - 350;
      const y = Math.random() * 700 - 350;
      const z = Math.random() * 700 - 350;

      vertices.push(x, y, z);

      const r = Math.random() * 0.15;
      const g = Math.random() * 0.31 + 0.01;
      const b = Math.random() * 0.25 + 0.65;
      colors.push(r, g, b);

      alphas.push(Math.random() * 0.3 + 0.4);

      const radian = Math.random() * Math.PI * 2;
      rotations.push(radian);

      pointSizes.push(Math.random() * 3.5 + 5);
    }
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    geometry.setAttribute(
      'aAlpha',
      new THREE.Float32BufferAttribute(alphas, 1)
    );
    geometry.setAttribute(
      'aRotation',
      new THREE.Float32BufferAttribute(rotations, 1)
    );
    geometry.setAttribute(
      'aSize',
      new THREE.Float32BufferAttribute(pointSizes, 1)
    );
    //geometry.addAttribute('random', new THREE.BufferAttribute(colorOffset, 1));

    const textureLoader = new THREE.TextureLoader();
    const sprite1 = textureLoader.load('textures/circle.png');

    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: sprite1 },
        /*fogColor: { type: 'c', value: scene.fog.color },
        fogNear: { type: 'f', value: scene.fog.near },
        fogFar: { type: 'f', value: scene.fog.far },*/
      },
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true,
      /*fog: true,*/
    });
    //material.uniforms.map.value = sprite1;
    //material.map = sprite1;

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const clock = new THREE.Clock();
    const animate = () => {
      //const time = Date.now() * 0.00005;
      const elapsedTime = clock.getElapsedTime();

      //camera.position.x = Math.sin(cursor.x * Math.PI * 0.5) * 50;
      //camera.position.z = Math.cos(cursor.x * Math.PI * 0.5) * 90 + 450;
      //camera.position.y = cursor.y * 70;

      camera.position.z = cursor.y * 28 + 280;
      camera.lookAt(scene.position);

      /*for (let i = 0; i < scene.children.length; i++) {
        const object = scene.children[i];

        if (object instanceof THREE.Points) {
          object.rotation.y = elapsedTime * (i < 4 ? i + 1 : -(i + 1));
          object.rotation.x = elapsedTime * (i < 2 ? -(i + 0.6) : i + 0.6);
        }
      }

      for (let i = 0; i < materials.length; i++) {
        const color = parameters[i][0];

        const r = ((360 * (color[0] + elapsedTime)) % 360) / 360;
        materials[i].color.setRGB(r, color[1], color[2]);
      }*/

      scene.children[0].rotation.y = -Math.sin(elapsedTime * 0.16) * 0.2;
      scene.children[0].rotation.x = elapsedTime * 0.05;
      //scene.children[0].rotation.x = elapsedTime * 1.2;

      material.uniforms.uTime.value = elapsedTime * 0.015;

      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('touchmove', touchMoveHandler);
    };
  }, []);
  return (
    <div
      style={{
        /*position: 'relative',*/
        minHeight: '100vh',
        /*overflow: 'hidden',*/
        overflowX: 'hidden',
      }}
      ref={containerRef}
    >
      <div className={classes.container} ref={contentRef}>
        <p className={classes.paragraph}>
          ambavi audio-vizualuri proeqtia, romelic aerTianebs qarTul forklorul
          Temebs, Tanamedrove eleqtronul JReradobebsa da vizualur xelovnebas.
          ambavi 2014 wels Seiqmna anri lomias, toresa mosis da naTi idenis
          mier.
          <br /> <br />
          leibli:{' '}
          <span style={{ fontFamily: 'BPGIrubaqidze' }}>Future Records</span>
        </p>
        <div className={classes.iconsContainer}>
          <a
            href='https://www.facebook.com/AmbaviOfficial'
            target='_blank'
            className={classes.iconContainer}
            rel='noreferrer'
          >
            <FontAwesomeIcon icon={faFacebook} className={classes.icon} />
          </a>
          <a
            href='https://www.instagram.com/ambaviofficial/'
            target='_blank'
            className={classes.iconContainer}
            rel='noreferrer'
          >
            <FontAwesomeIcon icon={faInstagram} className={classes.icon} />
          </a>
          <a
            href='https://soundcloud.com/ambaviofficial'
            target='_blank'
            className={classes.iconContainer}
            rel='noreferrer'
          >
            <FontAwesomeIcon icon={faSoundcloud} className={classes.icon} />
          </a>
          <a href='' className={classes.iconContainer}>
            <FontAwesomeIcon icon={faYoutube} className={classes.icon} />
          </a>
        </div>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Qalaqshi;
