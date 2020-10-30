import React from 'react';
import styles from './nope.module.sass';

import foodDrive from '../assets/images/foodDrive.svg';

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

function Cans() {
  return (
    <div className={[styles.wrapper, styles.twoCol, 'page--purple'].join(' ')}>
      <img src={foodDrive} alt="Food Drive" style={{ maxWidth: '400px' }} />
      <div>
        <h1>Annual Canned Food Drive</h1>
        <p>
          {`${greetingMessage}`}! This year, we are stepping up our canned food
          drive.
        </p>
        <p>
          <b>Beginning today</b>, we are accepting monetary donations for canned
          goods to be purchased and donated on your behalf. Visit the school's
          website to make a donation through PayPal. Make sure to enter your
          child's House in the "special instructions to the seller" field to
          earn House points!
        </p>
        <p>
          <a
            href="https://www.saintanselms.org/students"
            target="_blank"
            rel="noopener noreferrer"
            className="button primary round has-icon"
          >
            Donate Online <span>&rarr;</span>
          </a>
        </p>
        <p>
          <b>Beginning Monday</b>, November 2nd, we will kick off our in-person
          donations! Each school day, no-contact collection bins will be placed
          outside the Upper Academic Building.
        </p>

        <p>Thank you for your support!</p>
      </div>
    </div>
  );
}

export default Cans;
