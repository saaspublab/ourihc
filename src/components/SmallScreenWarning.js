/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import styles from '../pages/trivia.module.sass';

export default function SmallScreenWarning() {
  return (
    <div className={styles.smallScreenWarning}>
      <p>
        <b>Heads up!</b> This dashboard works better on larger screens, such as
        laptops.
      </p>
    </div>
  );
}
