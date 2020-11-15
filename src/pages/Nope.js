import Greeting from '../components/Greeting';
import styles from './nope.module.sass';

function Home() {
  return (
    <div className={styles.wrapper}>
      <h1>
        <Greeting />
      </h1>
      <p>Something's in store... you'll just have to check back later.</p>
      <br />
      {/* <Link to="/lunch" className="button primary round shadow has-icon">
        Lunch Scheduler <span>&rarr;</span>
      </Link> */}
    </div>
  );
}
export default Home;
