import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import VanillaTilt from 'vanilla-tilt';

import daigvianesImg from '../../assets/images/daigvianes.jpg';
import gantiadiImg from '../../assets/images/gantiadi.jpg';

import classes from './Art.module.css';

const options = {
  scale: 1.1,
  speed: 2000,
  max: 15,
};

const Art = () => {
  const daigvianesRef = useRef();
  const gantiadiRef = useRef();
  useEffect(() => {
    VanillaTilt.init(daigvianesRef.current, options);
    VanillaTilt.init(gantiadiRef.current, options);
  }, []);
  return (
    <div className={classes.wrapper} style={{ minHeight: '100vh' }}>
      <div
        className={classes.container}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className={classes.cardList}>
          <Link to='/art/daigvianes' className={classes.cardContainer}>
            <img
              ref={daigvianesRef}
              className={classes.card}
              src={daigvianesImg}
            />
          </Link>
          <Link className={classes.cardContainer} to='/art/gantiadi'>
            <img ref={gantiadiRef} className={classes.card} src={gantiadiImg} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Art;
