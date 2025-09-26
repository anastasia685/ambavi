import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPauseCircle,
  faPlayCircle,
} from '@fortawesome/free-regular-svg-icons';

import classes from './Track.module.css';

const Track = (props) => {
  const { label, isActive, isPlaying, onPlay } = props;
  return (
    <>
      <button
        className={classNames(
          classes.audioButton,
          isActive ? classes.active : null
        )}
        onClick={onPlay}
      >
        <FontAwesomeIcon
          icon={isActive && isPlaying ? faPauseCircle : faPlayCircle}
          className={classes.icon}
        />
      </button>
      <label className={isActive ? classes.active : null}>{label}</label>
    </>
  );
};

export default Track;
