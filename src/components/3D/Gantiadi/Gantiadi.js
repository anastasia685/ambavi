import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer, RenderPass, EffectPass } from 'postprocessing';
import gsap from 'gsap';
import classNames from 'classnames';

import { Ripples } from '../Ripples/Ripples';
import { RippleEffect } from '../Ripples/RippleEffect';

import classes from './Gantiadi.module.css';

const Gantiadi = (props) => {
  const canvasRef = useRef();
  const contentRef = useRef();
  const textRef = useRef();
  const cursorRef = props.cursorRef;

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
    const fov = (180 * (2 * Math.atan(sizes.height / 2 / 1000))) / Math.PI;
    const camera = new THREE.PerspectiveCamera(
      fov,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: false,
    });
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load('/textures/gantiadi.jpg');
    const rippleTexture = new Ripples({ debug: false });

    /**
     * Composer
     */
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    const rippleEffect = new RippleEffect(rippleTexture.texture);
    const ripplePass = new EffectPass(camera, rippleEffect);

    renderPass.renderToScreen = false;
    ripplePass.renderToScreen = true;
    composer.addPass(renderPass);
    composer.addPass(ripplePass);

    //const glitchPass = new GlitchPass();
    //composer.addPass(glitchPass);

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
      const point = {
        x: event.clientX / document.documentElement.clientWidth,
        y: event.clientY / document.documentElement.clientHeight,
      };
      rippleTexture.addPoint(point);

      cursor.x = event.clientX / sizes.width - 0.5;
      cursor.y = -(event.clientY / sizes.height - 0.5);

      gsap.to(cursorRef.current, 0.8, {
        x: event.pageX - 15,
        y: event.pageY - 15,
      });
    };
    window.addEventListener('mousemove', mouseMoveHandler);

    const touchMoveHandler = (event) => {
      const point = {
        x: event.touches[0].clientX / document.documentElement.clientWidth,
        y: event.touches[0].clientY / document.documentElement.clientHeight,
      };
      rippleTexture.addPoint(point);

      cursor.x = event.touches[0].clientX / sizes.width - 0.5;
      cursor.y = -(event.touches[0].clientY / sizes.height - 0.5);

      gsap.to(cursorRef.current, 0.8, {
        x: event.touches[0].pageX - 15,
        y: event.touches[0].pageY - 15,
      });
    };
    window.addEventListener('touchmove', touchMoveHandler);

    const cursorEnterHandler = (event) => {
      if (cursorRef && cursorRef.current)
        gsap.to(cursorRef.current, 0.3, {
          scale: 2.2,
        });
    };
    const cursorLeaveHandler = (event) => {
      if (cursorRef && cursorRef.current)
        gsap.to(cursorRef.current, 0.3, {
          scale: 1,
        });
    };
    //textRef.current.addEventListener('mouseenter', cursorEnterHandler);
    //textRef.current.addEventListener('mouseleave', cursorLeaveHandler);

    /**
     * Add Mesh
     */
    const geometry = new THREE.PlaneBufferGeometry(16, 9, 1, 1);
    const material = new THREE.MeshBasicMaterial({ map: backgroundTexture });
    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    /**
     * Animate
     */
    const clock = new THREE.Clock();
    const animate = () => {
      //UPDATE CAMERA
      camera.position.x = Math.sin(cursor.x * Math.PI * 0.5) * 0.5;
      camera.position.z = Math.cos(cursor.x * Math.PI * 0.5) * 1.6 + 6;
      camera.position.y = cursor.y * 1.2;
      camera.lookAt(mesh.position);

      rippleTexture.update();

      //renderer.render(scene, camera);
      composer.render(clock.getDelta());
      window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeHandler);
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('touchmove', touchMoveHandler);
    };
  }, [cursorRef]);

  return (
    <div
      id='contact'
      ref={props.containerRef}
      style={{
        /*position: 'relative',
        maxHeight: '100vh',
        overflow: 'hidden',*/
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <div className={classes.container} ref={contentRef}>
        <div className={classes.headerContainer}>
          <h1 style={{ fontFamily: 'Calligraphy', color: 'black' }}>
            kontaqti
          </h1>
        </div>

        <form className={classes.form}>
          <div className={classes.inputsContainer}>
            <input className={classes.input} placeholder='თქვენი ელ-ფოსტა' />
            <input className={classes.input} placeholder='თემა' />
          </div>
          <textarea
            className={classes.textarea}
            rows='9'
            placeholder='შეტყობინება'
          />
          <div className={classes.buttonContainer}>
            <button className={classes.button} onClick={() => {}}>
              gagzavna
            </button>
          </div>
        </form>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Gantiadi;
