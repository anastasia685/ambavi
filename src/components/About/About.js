import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faSoundcloud,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

import Qalaqshi from '../3D/Qalaqshi/Qalaqshi';

import classes from './About.module.css';

const About = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Qalaqshi />

        {/*<h1 style={{ fontFamily: 'Calligraphy', fontWeight: 150 }}>
          Cven Sesaxeb
        </h1>
        <div
          style={{
            height: '400px',
            width: '100%',
            backgroundColor: 'var(--accent)',
          }}
        ></div>
        <p
          style={{
            fontSize: '18px',
          }}
        >
          ამბავი აუდიო-ვიზუალური პროექტია, რომელიც აერთიანებს ქართულ ფოლკლორულ
          თემებს, თანამედროვე ელექტრონულ ჟღერადობებსა და ვიზუალურ ხელოვნებას.
          ამბავი 2014 წელს შეიქმნა ანრი ლომიას, ტორესა მოსის და ნათი იდენის
          მიერ. <br />
          <br /> ლეიბლი: Future Records.
        </p>

        <div className={classes.iconsContainer}>
          <a
            href='https://www.facebook.com/AmbaviOfficial'
            target='_blank'
            className={classes.iconContainer}
          >
            <FontAwesomeIcon icon={faFacebook} className={classes.icon} />
          </a>
          <a
            href='https://www.instagram.com/ambaviofficial/'
            target='_blank'
            className={classes.iconContainer}
          >
            <FontAwesomeIcon icon={faInstagram} className={classes.icon} />
          </a>
          <a
            href='https://soundcloud.com/ambaviofficial'
            target='_blank'
            className={classes.iconContainer}
          >
            <FontAwesomeIcon icon={faSoundcloud} className={classes.icon} />
          </a>
          <a href='' className={classes.iconContainer}>
            <FontAwesomeIcon icon={faYoutube} className={classes.icon} />
          </a>
        </div>*/}
      </div>
    </div>
  );
};

export default About;
