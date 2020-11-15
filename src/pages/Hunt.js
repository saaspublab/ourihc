import { useEffect } from 'react';
import styles from './nope.module.sass';

function Hunt() {
  useEffect(() => {
    document.title = 'Scavenger Hunt';
  }, []);

  return (
    <div className={[styles.wrapper, 'page--purple'].join(' ')}>
      <h4>House Day Week:</h4>
      <h1>Scavenger Hunt</h1>
      <p>
        The Pre-House Day Scavenger Hunt has ended. Thank you to everyone who
        participated and congratulations to Austin House for their win!
      </p>
    </div>
  );
}

export default Hunt;
