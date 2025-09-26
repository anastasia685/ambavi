import React from 'react';

import Album from '../Album/Album';

import classes from '../Art.module.css';

import gantiadi from '../../../assets/audio/gantiadi/Gantiadi.mp3';
import intervals from '../../../assets/audio/gantiadi/Intervals.mp3';
import qalaqshi from '../../../assets/audio/gantiadi/Qalaqshi.mp3';
import synapse from '../../../assets/audio/gantiadi/Synapse.mp3';
import cover from "../../../assets/images/gantiadi.jpg";

const gantiadiEP = [
  {
    source: gantiadi,
    label: 'განთიადი',
    duration: '5:30',
  },
  {
    source: intervals,
    label: 'Intervals',
    duration: '4:53',
  },
  {
    source: qalaqshi,
    label: 'ქალაქში',
    duration: '8:0',
  },
  {
    source: synapse,
    label: 'Synapse',
    duration: '6:21',
  },
];

const Gantiadi = () => {
  return(
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Album tracks={gantiadiEP} cover={cover} title={"GANTIADI EP"} />
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

export default Gantiadi;
