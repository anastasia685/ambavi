import React, {useState} from 'react';

import classes from './Product.module.css';

const Product = () => {
  const [size, setSize] = useState('M');
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <div className={classes.imgContainer}></div>
        <div className={classes.infoContainer}>
          <h2 style={{ marginTop: 0 }}>Title</h2>
          <h2 style={{ fontWeight: 800 }}>Price</h2>
          <div className={classes.sizeContainer}>
            <div className={classes.size}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
