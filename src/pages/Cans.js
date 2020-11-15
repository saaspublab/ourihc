import { useEffect } from 'react';
import styles from './nope.module.sass';
import Greeting from '../components/Greeting';
import foodDrive from '../assets/images/foodDrive.svg';

function Cans() {
  useEffect(() => {
    document.title = 'Annual Canned Food Drive';
  }, []);

  return (
    <div className={[styles.wrapper, styles.twoCol, 'page--purple'].join(' ')}>
      <img src={foodDrive} alt="Food Drive" style={{ maxWidth: '400px' }} />
      <div>
        <h1>Annual Canned Food Drive</h1>
        <p>
          <Greeting case="sentence" />! This year, we are stepping up our canned
          food drive with two great ways to help our community.
        </p>
        <p>
          First, we are accepting monetary donations for non-perishable goods to
          be purchased and donated on your behalf. Visit the link below to make
          a secure donation through the school's PayPal. Make sure to enter your
          House in the "special instructions to the seller" field to earn House
          points!
        </p>
        <p>
          <a
            href="https://www.paypal.com/donate/?hosted_button_id=ZMQHDNUDKTS9W"
            target="_blank"
            rel="noopener noreferrer"
            className="button primary round has-icon"
          >
            Donate Online <span>&rarr;</span>
          </a>
        </p>
        <p>
          In-person donations will be accepted until Wednesday, November 18th! A
          no-contact collection area is located just inside the Upper Academic
          Building. Leave non-perishable goods in your House's section to earn
          House points.
        </p>

        <p>Thank you for your support!</p>
      </div>
    </div>
  );
}

export default Cans;
