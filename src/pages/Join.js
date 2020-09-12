import React from 'react';
import styles from './nope.module.sass';

function Join() {
  return (
    <div className={[styles.wrapper, 'page--maroon'].join(' ')}>
      <h1>House Day 2020</h1>
      <p>
        Thank you to everyone who participated in House Day 2020 and
        congratulations to Austin House for their win.
      </p>
    </div>
  );
}

export default Join;
