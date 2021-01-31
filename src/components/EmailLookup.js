/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import useSound from 'use-sound';
import useStickyState from '../hooks/UseStickyState';
import Greeting from './Greeting';

import continueSfx from '../assets/sounds/continue.mp3';

// eslint-disable-next-line react/prop-types
function EmailLookup({ guestEnabled, sendDataToParent }) {
  // const { value: email, bind: bindEmail } = useInput('@saintanselms.org');
  const [email, setEmail] = useStickyState('@saintanselms.org', 'email');
  const [touched, setTouched] = useState(false);
  const [people, setPeople] = useState({});
  const [nickname, setNickname] = useState('');
  const [house, setHouse] = useState('');
  const [triviaAdmin, setTriviaAdmin] = useState(false);
  const [triviaParticipant, setTriviaParticipant] = useState(false);

  // Sounds
  const [playContinue] = useSound(continueSfx, {
    volume: 0.25,
  });

  const guestEmail = 'guest@saintanselms.org';

  async function fetchEmails() {
    await fetch('/api/emails/')
      .then((res) => res.json())
      .then((res) => {
        setPeople(res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }

  async function logInAsGuest() {
    // eslint-disable-next-line no-console
    console.log('[EmailLookup] Joining as guest...');
    await setEmail(guestEmail);
    await setNickname('Guest');
    await setHouse('N/A');
    await setTriviaAdmin(false);
    await setTriviaParticipant(false);

    sendDataToParent({
      email: guestEmail,
      nickname: 'Guest',
      house: 'N/A',
      triviaAdmin: false,
      triviaParticipant: false,
    });
  }

  useEffect(() => {
    if (email === guestEmail) {
      logInAsGuest();
    } else {
      fetchEmails();
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (
      isMounted &&
      people.length > 1 &&
      email.length > 1 &&
      people.filter((e) => e.email === email).length > 0
    ) {
      // eslint-disable-next-line no-console
      console.log('[EmailLookup] Email matched. Joining...');

      setNickname(people.find((obj) => obj.email === email).nickname);
      setHouse(people.find((obj) => obj.email === email).house);
      setTriviaAdmin(
        people.find((obj) => obj.email === email).triviaAdmin || false
      );
      setTriviaParticipant(
        people.find((obj) => obj.email === email).triviaParticipant || false
      );
      sendDataToParent({
        email,
        nickname,
        house,
        triviaAdmin,
        triviaParticipant,
      });

      // Play sound effect once data is validated
      if (touched) {
        playContinue();
      }
    }

    return function cleanup() {
      isMounted = false;
    };
  }, [people, email, nickname, house, triviaAdmin, triviaParticipant]);

  return (
    <>
      {(!people || !people.length) && email !== guestEmail && (
        <section className="bordered">
          <h3 className="heading">Loading... Please wait...</h3>
          <p>
            If this message remains for more than 20 seconds, please message us
            on <Link to="/discord">Discord</Link> or by email &rarr;{' '}
            <a
              href="mailto:ihc@saintanselms.org"
              target="_blank"
              rel="noopener noreferrer nofoollow"
            >
              ihc@saintanselms.org
            </a>
            .
          </p>
        </section>
      )}

      {people.length > 1 &&
        (!email || !people.filter((e) => e.email === email).length > 0) &&
        email !== guestEmail && (
          <section className="bordered">
            <form style={{ margin: 0 }}>
              <label htmlFor="email">
                Your SAAS Email Address
                <input
                  type="email"
                  name="email"
                  placeholder="@saintanselms.org"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setTouched(true);
                  }}
                  required
                />
              </label>

              <p>
                <b>IMPORTANT:</b> once you type your email address, you will not
                be able to change it.
              </p>

              {guestEnabled && (
                <>
                  <p style={{ verticalAlign: 'middle' }}>
                    <button
                      type="button"
                      className="button gold small round has-icon"
                      onClick={() => logInAsGuest()}
                    >
                      Join as a Guest <span>&rarr;</span>
                    </button>{' '}
                    <small style={{ marginLeft: '10px' }}>
                      [note some functionality may be unavailable]
                    </small>
                  </p>
                </>
              )}
            </form>

            {email.length >= '@saintanselms.org'.length + 3 &&
              !email === guestEmail && (
                <p style={{ marginTop: '1.5rem' }}>
                  <b>
                    Hmmm... We weren't able to find anyone with that email
                    address.
                  </b>{' '}
                  Duoble-check your spelling, and if the error persists, message
                  us on <Link to="/discord">Discord</Link> or by email &rarr;{' '}
                  <a
                    href="mailto:ihc@saintanselms.org"
                    target="_blank"
                    rel="noopener noreferrer nofoollow"
                  >
                    ihc@saintanselms.org
                  </a>
                  .
                </p>
              )}
          </section>
        )}

      {people.length > 1 &&
        email.length > 1 &&
        people.filter((e) => e.email === email).length > 0 && (
          <>
            <section className="content--block bordered">
              <h3 className="heading" style={{ margin: 0 }}>
                <Greeting case="eachWord" />,{' '}
                {nickname + (house ? ` (${house} House)` : '')}!
              </h3>
            </section>
          </>
        )}

      {email === guestEmail && (
        <section className="content--block bordered">
          <h3 className="heading" style={{ margin: 0 }}>
            <Greeting case="eachWord" />!
          </h3>
        </section>
      )}
    </>
  );
}

export default EmailLookup;
