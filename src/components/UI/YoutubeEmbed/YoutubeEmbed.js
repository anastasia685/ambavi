import React, { useState } from 'react';
import Loader from 'react-loader-spinner';

import classes from './YoutubeEmbed.module.css';

const YoutubeEmbed = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <div className={classes.container}>
      {isLoading && <Loader type='TailSpin' color='#0003a6' />}
      <iframe
        width='560'
        height='315'
        src={props.url}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  );
};

export default React.memo(YoutubeEmbed);
