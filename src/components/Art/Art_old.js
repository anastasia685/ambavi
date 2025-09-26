import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

import vertexShader from '../shaders/visualizer/vertex.glsl';
import fragmentShader from '../shaders/visualizer/fragment.glsl';

import Track from './Track/Track';

import Album from './Album/Album';

import classes from './Art.module.css';

const Art_old = () => {
  const canvasRef = useRef();
  const canvasContainerRef = useRef();

  const [activeInstance, setActiveInstance] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  let currentAnalyser, currentDataArray;
  const context = new AudioContext();
  const analyser = context.createAnalyser();
  analyser.fftSize = 512;
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.connect(context.destination);

  const playHandler = (instance) => {
    //document.getElementById('daigvianes').play();
    if (!activeInstance) {
      instance.current.play();
      setActiveInstance(instance);
      setIsPlaying(true);
    } else if (activeInstance !== instance) {
      activeInstance.current.pause();
      activeInstance.current.currentTime = 0;

      instance.current.play();

      setActiveInstance(instance);
      setIsPlaying(true);
    } else {
      if (isPlaying) instance.current.pause();
      else instance.current.play();

      setIsPlaying((prevState) => !prevState);
    }
  };

  const daigvianesRef = useRef();
  const shaviMertskhaliRef = useRef();
  const haraliRef = useRef();
  const danceRef = useRef();
  const heshelaRef = useRef();

  const gantiadiRef = useRef();
  const intervalsRef = useRef();
  const qalaqshiRef = useRef();
  const synapseRef = useRef();

  const daigvianesEP = [
    {
      instance: daigvianesRef,
      source: 'audio/daigvianes/Daigvianes.mp3',
      label: 'დაიგვიანეს',
      duration: '3:36',
    },
    {
      instance: shaviMertskhaliRef,
      source: 'audio/daigvianes/ShaviMertskhali.mp3',
      label: 'შავი მერცხალი',
      duration: '8:45',
    },
    {
      instance: haraliRef,
      source: 'audio/daigvianes/Harali.mp3',
      label: 'ჰარალი',
      duration: '7:28',
    },
    {
      instance: danceRef,
      source: 'audio/daigvianes/Dance.mp3',
      label: 'Dance',
      duration: '8:12',
    },
    {
      instance: heshelaRef,
      source: 'audio/daigvianes/Heshela.mp3',
      label: 'ჰეშელა',
      duration: '7:38',
    },
  ];
  const gantiadiEP = [
    {
      instance: gantiadiRef,
      source: 'audio/gantiadi/Gantiadi.mp3',
      label: '1. განთიადი',
    },
    {
      instance: intervalsRef,
      source: 'audio/gantiadi/Intervals.mp3',
      label: '2. Intervals',
    },
    {
      instance: qalaqshiRef,
      source: 'audio/gantiadi/Qalaqshi.mp3',
      label: '3. ქალაქში',
    },
    {
      instance: synapseRef,
      source: 'audio/gantiadi/Synapse.mp3',
      label: '4. Synapse',
    },
  ];

  const endHandler = () => {
    setIsPlaying(false);
  };
  useEffect(() => {
    /*daigvianesEP.map((item) => {
      item.instance.current.onended = endHandler;
      item.contextSource = context.createMediaElementSource(
        item.instance.current
      );
      item.contextSource.connect(analyser);
    });
    gantiadiEP.map((item) => {
      item.instance.current.onended = endHandler;
      item.contextSource = context.createMediaElementSource(
        item.instance.current
      );
      item.contextSource.connect(analyser);
    });*/
    /**
     * Init
     */
    /*const parentWidth = canvasContainerRef.current.offsetWidth;

    //const sizes = { width: window.innerWidth, height: window.innerHeight };
    const sizes = { width: parentWidth, height: parentWidth };

    const scene = new THREE.Scene();

    const fov = (180 * (2 * Math.atan(sizes.height / 2 / 1000))) / Math.PI;
    const camera = new THREE.PerspectiveCamera(
      fov,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.z = 11;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: false,
    });
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));*/
    /**
     * Handle window resize
     */
    /*const resizeHandler = () => {
      //UPDATE SIZES
      sizes.width = canvasContainerRef.current.offsetWidth;
      sizes.height = sizes.width;

      //UPDATE CAMERA
      camera.fov = (180 * (2 * Math.atan(sizes.height / 2 / 1000))) / Math.PI;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      //UPDATE RENDERER
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', resizeHandler);*/
    /*const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      wireframe: true,
      uniforms: {
        bassFr: { value: 0 },
        treFr: { value: 0 },
        uTime: { value: 0 },
      },
    });

    const mesh = new THREE.Mesh(
      new THREE.IcosahedronBufferGeometry(1.7, 5),
      /!*new THREE.MeshBasicMaterial({ wireframe: true, color: 0x0003a6 })*!/
      material
    );
    scene.add(mesh);*/
    /*const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      let bassFr = 0;
      let treFr = 0;

      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);

        const lowerHalfArray = dataArray.slice(0, dataArray.length / 2 - 1);
        const upperHalfArray = dataArray.slice(
          dataArray.length / 2 - 1,
          dataArray.length - 1
        );

        const overallAvg = avg(dataArray);
        const lowerMax = max(lowerHalfArray);
        const lowerAvg = avg(lowerHalfArray);
        const upperMax = max(upperHalfArray);
        const upperAvg = avg(upperHalfArray);

        const lowerMaxFr = lowerMax / lowerHalfArray.length;
        const lowerAvgFr = lowerAvg / lowerHalfArray.length;
        const upperMaxFr = upperMax / upperHalfArray.length;
        const upperAvgFr = upperAvg / upperHalfArray.length;

        bassFr = modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 8);
        treFr = modulate(upperAvgFr, 0, 1, 0, 4);
      }

      material.uniforms.uTime.value = elapsedTime * 0.2;
      material.uniforms.bassFr.value = bassFr;
      material.uniforms.treFr.value = treFr;

      mesh.rotation.y = elapsedTime * 0.1;
      mesh.rotation.x = Math.sin(elapsedTime * 0.05);

      renderer.render(scene, camera);

      window.requestAnimationFrame(animate);
    };
    animate();*/
    //renderer.render(scene, camera);
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Album tracks={daigvianesEP} cover='/images/daigvianes.jpg' />
        {/*<div style={{ display: 'flex' }}>
          <div>
            <h2>DAIGVIANES EP:</h2>
            <ul className={classes.list}>
              {daigvianesEP.map((item, index) => (
                <li className={classes.listItem} key={index}>
                  <Track
                    instance={item.instance}
                    source={item.source}
                    label={item.label}
                    isActive={activeInstance === item.instance}
                    isPlaying={isPlaying}
                    onPlay={() => playHandler(item.instance)}
                  />
                </li>
              ))}
            </ul>
            <h2 style={{ marginTop: '60px' }}>GANTIADI EP:</h2>
            <ul className={classes.list}>
              {gantiadiEP.map((item, index) => (
                <li className={classes.listItem} key={index}>
                  <Track
                    instance={item.instance}
                    source={item.source}
                    label={item.label}
                    isActive={activeInstance === item.instance}
                    isPlaying={isPlaying}
                    onPlay={() => playHandler(item.instance)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div ref={canvasContainerRef} className={classes.canvasContainer}>
            <canvas ref={canvasRef} />
          </div>
        </div>*/}
        <h3
          style={{ marginBlockStart: 0, marginBlockEnd: 0, marginTop: '50px' }}
        >
          ამბავი მუსიკალურ პლატფორმებზე:
        </h3>
        <p style={{ marginBlockStart: '0.5em', fontSize: '18px' }}>
          ამბავის შემოქმედება წარმოდგენილია ყველა მნიშვნელოვან მუსიკალურ
          სტრიმინგ პლატფორმასა და ელექტრონულ მაღაზიაში.
        </p>
      </div>
    </div>
  );
};

export default Art_old;
