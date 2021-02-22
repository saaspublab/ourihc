import { useState, useEffect } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';

import styles from './trivia.module.sass';

import SmallScreenWarning from '../components/SmallScreenWarning';
import Greeting from '../components/Greeting';
import EmailLookup from '../components/EmailLookup';
import Buzzer from '../components/Buzzer';
import Chat from '../components/Chat';
import CurrentlyWatching from '../components/CurrentlyWatching';
import Bracket from '../components/Bracket';

let publishKey;
let subscribeKey;

if (process.env.NODE_ENV === 'development') {
  publishKey = process.env.REACT_APP_DEV_PUBLISH_KEY;
  subscribeKey = process.env.REACT_APP_DEV_SUBSCRIBE_KEY;
} else {
  publishKey = process.env.REACT_APP_PROD_PUBLISH_KEY;
  subscribeKey = process.env.REACT_APP_PROD_SUBSCRIBE_KEY;
}

const uuid = PubNub.generateUUID();
const pubnub = new PubNub({
  publishKey,
  subscribeKey,
  uuid,
});

const zoomLink =
  'https://saintanselms.zoom.us/j/91060697276?pwd=NFJVNXdzS3NoeEwzSWJQSTVJQnJxdz09';
const youtubeLink = '';

function Trivia() {
  // EmailLookup
  const [user, setUser] = useState({});
  const [authenticated, setAuthenticated] = useState(false);

  const sendDataToParent = (data) => {
    setUser(data);
  };

  useEffect(() => {
    document.title = 'Trivia Tournament';
  }, []);

  return (
    <div className="page--maroon">
      {!authenticated || !user || !user.nickname ? (
        <div className={[styles.authWall, 'fadeIn'].join(' ')}>
          <h2 className="heading">Authentication</h2>
          <p>
            Before you can participate in this interactive trivia tournament, we
            need to confirm who you are.
          </p>

          <SmallScreenWarning />

          <EmailLookup guestEnabled sendDataToParent={sendDataToParent} />

          {user &&
            user.email &&
            user.email !== null &&
            user.email.length >= '@saintanselms.org'.length + 3 &&
            user.nickname &&
            user.nickname.length >= 2 && (
              <button
                type="button"
                className="button primary round has-icon"
                onClick={() => setAuthenticated(true)}
              >
                Dive In <span>&rarr;</span>
              </button>
            )}
        </div>
      ) : (
        <div className={[styles.columns, 'fadeIn'].join(' ')}>
          <PubNubProvider client={pubnub}>
            <aside className={styles.sidebar}>
              <SmallScreenWarning />

              <div
                className={[styles.section, styles.greeting, styles.links].join(
                  ' '
                )}
              >
                <h2 className="heading">Trivia Tournament</h2>
                <p className={styles.description}>
                  <Greeting case="sentence" />, {user.nickname}! Follow along
                  with our live-updating bracket, chat messages from the IHC,
                  and more!
                </p>

                <div className={styles.actions}>
                  {(user.nickname !== 'Guest' || user.triviaParticipant) &&
                    zoomLink && (
                      <a
                        href={zoomLink}
                        target="__blank"
                        rel="noopener noreferrer"
                        className="button primary full round has-icon"
                      >
                        Zoom <span>&rarr;</span>
                      </a>
                    )}

                  {youtubeLink && (
                    <a
                      href={zoomLink}
                      target="__blank"
                      rel="noopener noreferrer"
                      className={[
                        'button primary full round has-icon',
                        user.nickname !== 'Guest' ? 'hollow' : '',
                      ].join(' ')}
                    >
                      YouTube <span>&rarr;</span>
                    </a>
                  )}
                </div>
              </div>

              {user.triviaParticipant ? (
                <div className={[styles.section, styles.greeting].join(' ')}>
                  <h3 className="heading">Buzzer</h3>
                  <p className={styles.description}>
                    Press the button below if you think you know the answer!
                  </p>

                  <hr />

                  <Buzzer participant={user.nickname} />
                </div>
              ) : (
                <div className={[styles.section, styles.greeting].join(' ')}>
                  <h3 className="heading">Buzzer</h3>
                  <p className={styles.description}>
                    Follow along as participants press their buzzer!
                  </p>

                  <hr />

                  <Buzzer />
                </div>
              )}

              <div className={[styles.section, styles.greeting].join(' ')}>
                <h3 className="heading">Chat</h3>
                <p className={styles.description}>
                  Keep an eye here for information from the IHC!
                </p>

                <hr />

                <Chat />
              </div>

              <div className={[styles.section, styles.greeting].join(' ')}>
                <h3 className="heading">Currently Following</h3>
                <CurrentlyWatching descriptionStyles={styles.description} />
              </div>
            </aside>
          </PubNubProvider>

          <Bracket emailAddress={user && user.email ? user.email : ''} />
        </div>
      )}
    </div>
  );
}

export default Trivia;
