import React from 'react';

import Album from '../Album/Album';

import classes from '../Art.module.css';

import daigvianes from '../../../assets/audio/daigvianes/Daigvianes.mp3';
import shaviMertskhali from '../../../assets/audio/daigvianes/ShaviMertskhali.mp3';
import harali from '../../../assets/audio/daigvianes/Harali.mp3';
import dance from '../../../assets/audio/daigvianes/Dance.mp3';
import heshela from '../../../assets/audio/daigvianes/Heshela.mp3';

import cover from '../../../assets/images/daigvianes.jpg';

const daigvianesEP = [
  {
    source: daigvianes,
    label: 'დაიგვიანეს',
    duration: '3:36',
  },
  {
    source: shaviMertskhali,
    label: 'შავი მერცხალი',
    duration: '8:45',
  },
  {
    source: harali,
    label: 'ჰარალი',
    duration: '7:28',
  },
  {
    source: dance,
    label: 'Dance',
    duration: '8:12',
  },
  {
    source: heshela,
    label: 'ჰეშელა',
    duration: '7:38',
  },
];

const Daigvianes = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Album tracks={daigvianesEP} cover={cover} title={"DAIGVIANES EP"} />
        <h3
          style={{ marginBlockStart: 0, marginBlockEnd: 0, marginTop: '50px' }}
        >
          ამბავი მუსიკალურ პლატფორმებზე:
        </h3>
        <p style={{ marginBlockStart: '0.5em'}}>
          ამბავის შემოქმედება წარმოდგენილია ყველა მნიშვნელოვან მუსიკალურ
          სტრიმინგ პლატფორმასა და ელექტრონულ მაღაზიაში.
        </p>
      </div>
    </div>
  );
};

export default Daigvianes;
