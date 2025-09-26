import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useHistory } from 'react-router';
import * as THREE from 'three';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

import vertexShader from '../../shaders/visualizer/vertex.glsl';
import fragmentShader from '../../shaders/visualizer/fragment.glsl';

import Track from '../Track/Track';

import classes from './Album.module.css';

//some helper functions here
const fractionate = (val, minVal, maxVal) => {
  return (val - minVal) / (maxVal - minVal);
};

const modulate = (val, minVal, maxVal, outMin, outMax) => {
  const fr = fractionate(val, minVal, maxVal);
  const delta = outMax - outMin;
  return outMin + fr * delta;
};

const avg = (arr) => {
  const total = arr.reduce((sum, b) => {
    return sum + b;
  });
  return total / arr.length;
};

const max = (arr) => {
  return arr.reduce((a, b) => {
    return Math.max(a, b);
  });
};

/*const audioElement = new Audio();

const context = new AudioContext();
const src = context.createMediaElementSource(audioElement);
const analyser = context.createAnalyser();
src.connect(analyser);
analyser.connect(context.destination);
analyser.fftSize = 512;
const dataArray = new Uint8Array(analyser.frequencyBinCount);*/

const Album = (props) => {
  //const audioElement = useMemo(() => new Audio(), []);
  const { tracks, cover, title } = props;

  const history = useHistory();

  const { audioElement, analyser, dataArray } = useMemo(() => {
    const audioElement = new Audio();
    const context = new AudioContext();
    const src = context.createMediaElementSource(audioElement);
    const analyser = context.createAnalyser();
    src.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 512;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    return { audioElement, analyser, dataArray };
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);

  const [currentItem, setCurrentItem] = useState({
    src: tracks[0].source,
    ...tracks[0],
  });
  const [duration, setDuration] = useState(216);
  const [currentTime, setCurrentTime] = useState('0:0');

  const sliderRef = useRef();
  const artContainerRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const loadHandler = () => {
      setDuration(Math.round(audioElement.duration));
    };
    const updateHandler = () => {
      const formated = Math.floor(audioElement.currentTime / 60)
        .toString()
        .concat(':', Math.round(audioElement.currentTime % 60).toString());

      setCurrentTime(formated);
      sliderRef.current.value = audioElement.currentTime;
    };
    const endHandler = () => {
      setIsPlaying(false);
    };
    audioElement.src = tracks[0].source;
    audioElement.addEventListener('loadeddata', loadHandler);
    audioElement.addEventListener('timeupdate', updateHandler);
    audioElement.addEventListener('ended', endHandler);

    return () => {
      audioElement.removeEventListener('loadeddata', loadHandler);
      audioElement.removeEventListener('timeupdate', updateHandler);
      audioElement.removeEventListener('ended', endHandler);
    };
  }, [tracks, audioElement]);

  useEffect(() => {
    const mouseDownHandler = () => {
      if (isPlaying) audioElement.pause();
    };
    const mouseUpHandler = () => {
      if (isPlaying) audioElement.play();
      audioElement.currentTime = sliderRef.current.value;
    };
    const inputHandler = (event) => {
      const formated = Math.floor(event.target.value / 60)
        .toString()
        .concat(':', Math.round(event.target.value % 60).toString());

      audioElement.currentTime = sliderRef.current.value;
      setCurrentTime(formated);
    };
    sliderRef.current.addEventListener('mousedown', mouseDownHandler);
    sliderRef.current.addEventListener('touchstart', mouseDownHandler);
    sliderRef.current.addEventListener('mouseup', mouseUpHandler);
    sliderRef.current.addEventListener('touchend', mouseUpHandler);
    sliderRef.current.addEventListener('input', inputHandler);

    const unlisten = history.listen((location) => {
      audioElement.pause();
      audioElement.currentTime = 0;
    });

    const node = sliderRef.current;
    return () => {
      node.removeEventListener('mousedown', mouseDownHandler);
      node.removeEventListener('touchstart', mouseDownHandler);
      node.removeEventListener('mouseup', mouseUpHandler);
      node.removeEventListener('touchend', mouseUpHandler);
      node.removeEventListener('input', inputHandler);
      unlisten();
    };
  }, [history, isPlaying, audioElement]);

  useEffect(() => {
    /**
     * Init
     */
    const parentWidth = artContainerRef.current.offsetWidth;

    //const sizes = { width: window.innerWidth, height: window.innerHeight };
    const sizes = { width: parentWidth, height: parentWidth };

    const scene = new THREE.Scene();

    //const fov = (180 * (2 * Math.atan(sizes.height / 2 / 1000))) / Math.PI;
    const camera = new THREE.PerspectiveCamera(
      25,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.z = 9;

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
      sizes.width = artContainerRef.current.offsetWidth;
      sizes.height = sizes.width;

      //UPDATE CAMERA
      //camera.fov = (180 * (2 * Math.atan(sizes.height / 2 / 1000))) / Math.PI;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      //UPDATE RENDERER
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', resizeHandler);

    const textureLoader = new THREE.TextureLoader();
    const backgroundTexture = textureLoader.load(cover);

    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      wireframe: true,
      uniforms: {
        bassFr: { value: 0 },
        treFr: { value: 0 },
        uTime: { value: 0 },
        uTexture: { value: backgroundTexture },
      },
    });
    /*const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(4, 4, 128, 128),
      /!*new THREE.MeshBasicMaterial({ wireframe: true })*!/
      material
    );*/
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.6, 32, 32),
      material
    );
    scene.add(mesh);

    const clock = new THREE.Clock();
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

        bassFr = modulate(Math.pow(lowerMaxFr, 0.8), 0, 1, 0, 0.55);
        treFr = modulate(upperAvgFr, 0, 1, 0, 0.55);
      }

      material.uniforms.uTime.value = elapsedTime * 0.2;
      material.uniforms.bassFr.value = bassFr;
      material.uniforms.treFr.value = treFr;

      mesh.rotation.y = elapsedTime * 0.1;
      //mesh.rotation.x = Math.sin(elapsedTime * 0.05);

      renderer.render(scene, camera);

      window.requestAnimationFrame(animate);
    };
    animate();

    renderer.render(scene, camera);

    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, [analyser, dataArray, cover]);

  const playHandler = (item) => {
    const fullSrc = window.location.origin.concat(item.src);
    if (audioElement.src === fullSrc) {
      if (audioElement.paused) audioElement.play();
      else audioElement.pause();

      setIsPlaying((prevState) => !prevState);
    } else {
      audioElement.src = item.src;
      audioElement.currentTime = 0;
      audioElement.play();

      setIsPlaying(true);
      setCurrentItem(item);
    }
  };

  return (
    <div className={classes.wrapper}>
      <h2 style={{ marginBlockStart: 0 }}>{title}</h2>
      <div className={classes.container}>
        <div className={classes.musicContainer}>
          <div className={classes.activePlayerContainer}>
            <button
              className={classes.playerButton}
              onClick={() => {
                if (audioElement.paused) audioElement.play();
                else audioElement.pause();
                setIsPlaying((prevState) => !prevState);
              }}
            >
              <FontAwesomeIcon
                icon={isPlaying ? faPause : faPlay}
                className={classes.icon}
              />
            </button>
            <div className={classes.activePlayer}>
              <div className={classes.trackInfo}>
                <label>{currentItem.label}</label>
                <div style={{ marginLeft: '4%', color: 'grey' }}>
                  <span>{currentTime}</span> /{' '}
                  <span>{currentItem.duration}</span>
                </div>
              </div>

              <input
                ref={sliderRef}
                defaultValue={0}
                type='range'
                className={classes.slider}
                min={0}
                max={duration}
                step={1}
              />
            </div>
          </div>
          <ul className={classes.list}>
            {tracks.map((item, index) => (
              <li className={classes.listItem} key={index}>
                <Track
                  source={item.source}
                  label={item.label}
                  isActive={currentItem.src === item.source}
                  isPlaying={isPlaying}
                  onPlay={() =>
                    playHandler({
                      src: item.source,
                      label: item.label,
                      duration: item.duration,
                    })
                  }
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={classes.artContainer} ref={artContainerRef}>
          <canvas ref={canvasRef} style={{ position: 'unset' }} />
        </div>
        {/*<img className={classes.artContainer} src={props.cover} />*/}
      </div>
    </div>
  );
};

export default Album;
