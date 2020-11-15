import styles from './nope.module.sass';
import Greeting from '../components/Greeting';
import abbeyDiscordLogo from '../assets/images/abbeydiscord.svg';

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
        <Greeting case="sentence" />! <b>The Abbey Discord</b> is your one-stop
        shop for student communications + announcements from the Inter-House
        Council.
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
