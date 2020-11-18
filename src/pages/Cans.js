import { useEffect } from 'react';
import styles from './nope.module.sass';
import foodDrive from '../assets/images/foodDrive.svg';

function Cans() {
  useEffect(() => {
    document.title = '2020 Canned Food Drive';
  }, []);

  return (
    <div className={[styles.wrapper, styles.twoCol, 'page--purple'].join(' ')}>
      <img src={foodDrive} alt="Food Drive" style={{ maxWidth: '400px' }} />
      <div>
        <h1>2020 Canned Food Drive</h1>
        <p>
          While in-person donations have ended, we are accepting monetary
          donations for non-perishable goods to be purchased and donated on your
          behalf. Visit the link below to make a secure donation through the
          school's PayPal.
        </p>
        <p>
          *Make sure to reference your House in the "special instructions to the
          seller" field.
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

        <p>Thank you for your support&mdash;we could not do it without you.</p>
      </div>
    </div>
  );
}

export default Cans;
