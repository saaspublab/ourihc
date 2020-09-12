import React from 'react';
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

function Discord() {
  return (
    <div className={[styles.wrapper, 'page--purple'].join(' ')}>
      <h1>The IHC's Latest Stories</h1>
      <p>
        {`${greetingMessage}`}! Here we'll be re-posting our most important
        Instagram Stories so those without an account can partake in the action.
      </p>

      <a
        href="//www.youtube.com/playlist?list=PLEWPH6POJXJOEQj-bu5RHHU7EdWw4dZ3U"
        target="_blank"
        rel="noopener noreferrer"
        className="button primary round has-icon"
      >
        View House Day Week Playlist <span>&rarr;</span>
      </a>
    </div>
  );
}

export default Discord;
