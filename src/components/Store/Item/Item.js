import React from 'react';

import classes from './Item.module.css';

const Item = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}></div>
      <div className={classes.info}>
        <label className={classes.title}>{props.data.title}</label>
        <label className={classes.price}>{props.data.price}$</label>
      </div>
    </div>
  );
};

export default Item;
