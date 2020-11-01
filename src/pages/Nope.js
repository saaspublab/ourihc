import styles from './nope.module.sass';

const currentHour = new Date().getHours();
let greetingMessage;

if (currentHour >= 4 && currentHour < 12) {
  // after 4:00AM and before 12:00PM
  greetingMessage = 'Good morning';
} else if (currentHour >= 12 && currentHour <= 17) {
  // after 12:00PM and before 6:00pm
  greetingMessage = 'Good afternoon';
} else if (currentHour > 17 || currentHour < 4) {
  // after 5:59pm or before 4:00AM (to accommodate night owls)
  greetingMessage = 'Good evening';
} else {
  // if for some reason the calculation didn't work
  greetingMessage = 'Welcome';
}

function Home() {
  return (
    <div className={styles.wrapper}>
      <h1>{`${greetingMessage}!`}</h1>
      <p>Something's in store... you'll just have to check back later.</p>
      <br />
      {/* <Link to="/lunch" className="button primary round shadow has-icon">
        Lunch Scheduler <span>&rarr;</span>
      </Link> */}
    </div>
  );
}
export default Home;
