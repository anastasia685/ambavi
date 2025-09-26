import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

import Title from '../3D/Title/Title';
import Gantiadi from '../3D/Gantiadi/Gantiadi';
import Qalaqshi from '../3D/Qalaqshi/Qalaqshi';

import classes from './Landing.module.css';

const Landing = (props) => {
  const containerRef = useRef();
  const cursorRef = useRef();
  const titleRef = useRef();
  const contactRef = useRef();

  const [titleComplete, setTitleComplete] = useState(false);

  useEffect(() => {
    //cursorRef.current.style.transform = 'translate(-50, -50)';
    let mouseMoved = false;
    const mouseMoveHandler = (event) => {
      if (!mouseMoved) {
        cursorRef.current.style.display = 'block';
        mouseMoved = true;

        gsap.to(cursorRef.current, 0, {
          x: event.pageX - 30,
          y: event.pageY - 30,
        });
      } else {
        gsap.to(cursorRef.current, 0, {
          x: event.pageX - 30,
          y: event.pageY - 30,
        });
      }
    };
    const touchMoveHandler = (event) => {
      gsap.to(cursorRef.current, 0.4, {
        x: event.touches[0].pageX - 15,
        y: event.touches[0].pageY - 15,
      });
    };
    const touchStartHandler = () => {
      cursorRef.current.style.display = 'block';
    };
    const touchEndHandler = () => {
      cursorRef.current.style.display = 'none';
    };
    window.addEventListener('mousemove', mouseMoveHandler);
    //window.addEventListener('touchmove', touchMoveHandler);
    //window.addEventListener('touchstart', touchStartHandler);
    //window.addEventListener('touchend', touchEndHandler);

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      //window.removeEventListener('touchmove', touchMoveHandler);
      //window.removeEventListener('touchstart', touchStartHandler);
      //window.removeEventListener('touchend', touchEndHandler);
    };
  }, []);
  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        /*overflowY: 'scroll',
        overflowX: 'hidden',
        scrollSnapType: 'y mandatory',*/
        width: '100%',
        position: 'absolute',
        top: 0,
      }}
    >
      <div className={classes.cursor}>
        <div className={classes.ball} ref={cursorRef}>
          <svg height='70' width='70'>
            <circle
              className={classes.circle}
              cx='36'
              cy='36'
              r='34'
              strokeWidth='0'
            ></circle>
          </svg>
        </div>
      </div>

      <Title
        containerRef={titleRef}
        onLoad={() => console.log('prop function called')}
      />
      {/*<Qalaqshi cursorRef={cursorRef} />
      <div id='contact'>
        <Gantiadi containerRef={props.contactRef} cursorRef={cursorRef} />
      </div>*/}

      {/*<div
        style={{
          height: '100vh',
          width: '100%',
          backgroundColor: 'blue',
          scrollSnapAlign: 'start',
          scrollSnapStop: 'always',
        }}
      ></div>*/}
    </div>
  );
};

export default Landing;
