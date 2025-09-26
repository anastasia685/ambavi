import React, { useRef } from 'react';
import Gantiadi from '../3D/Gantiadi/Gantiadi';

import classes from './Contact.module.css';

const Contact = () => {
  const cursorRef = useRef();
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <Gantiadi cursorRef={cursorRef} />
      </div>
    </div>
  );
};

export default Contact;
