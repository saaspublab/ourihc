import styles from './nope.module.sass';

import abbeyDiscordLogo from '../assets/images/abbeydiscord.svg';

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

function Discord() {
  return (
    <div className={[styles.wrapper, 'page--purple'].join(' ')}>
      <img
        src={abbeyDiscordLogo}
        alt="Discord | St. Anselm's Abbey School"
        style={{ maxWidth: '400px' }}
      />
      <h1 style={{ display: 'none', visibility: 'hidden' }}>
        The Abbey Discord
      </h1>
      <p>
        {`${greetingMessage}`}! <b>The Abbey Discord</b> is your one-stop shop
        for student communications + announcements from the Inter-House Council.
      </p>

      <p>If you haven't yet joined, you're missing out. Let's get connected.</p>

      <a
        href="https://discord.gg/rFZmm8S"
        target="_blank"
        rel="noopener noreferrer"
        className="button primary round has-icon"
      >
        Join Our Server <span>&rarr;</span>
      </a>
    </div>
  );
}

export default Discord;
