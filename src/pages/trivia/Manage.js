import { useEffect } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';

import styles from '../trivia.module.sass';

import Greeting from '../../components/Greeting';
import Chat from '../../components/Chat';
import CurrentlyWatching from '../../components/CurrentlyWatching';
import Bracket from '../../components/Bracket';

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

function TriviaManage() {
  useEffect(() => {
    document.title = 'Manage: Trivia Tournament';
  }, []);

  return (
    <div className="page--maroon">
      <div className={styles.banner}>
        <h2>MANAGE</h2>
      </div>
      <div className={styles.columns}>
        <aside className={styles.sidebar}>
          <div className={(styles.section, styles.greeting)}>
            <h2 className="heading">Trivia Tournament</h2>
            <p className={styles.description}>
              <Greeting case="sentence" />! Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
            </p>
          </div>

          <div className={(styles.section, styles.greeting)}>
            <h3 className="heading">Chat</h3>
            <p className={styles.description}>
              Keep an eye here for information from the IHC!
            </p>

            <PubNubProvider client={pubnub}>
              <Chat authenticated />
            </PubNubProvider>
          </div>

          <div className={(styles.section, styles.greeting)}>
            <h3 className="heading">Currently Watching</h3>
            <p className={styles.description}>
              <PubNubProvider client={pubnub}>
                <CurrentlyWatching />
              </PubNubProvider>
            </p>
          </div>
        </aside>

        <Bracket />
      </div>
    </div>
  );
}

export default TriviaManage;
