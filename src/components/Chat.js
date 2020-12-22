import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePubNub } from 'pubnub-react';
import styles from './chat.module.sass';

function Bracket({ authenticated }) {
  const PubNubClient = usePubNub();

  // PubNub data
  const [connected, setConnected] = useState(false);
  const [channels] = useState(['trivia-ihc-messages']);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    'Welcome to the first IHC-hosted Teacher v. Teacher Trivia Tournament!',
    'And with that we are moving onto the Quarter-Finals. Congratulations to all of the teams who are still in the running!',
  ]);

  const handleMessage = (event) => {
    // console.log(event);
    const msg = event.message;
    // eslint-disable-next-line no-prototype-builtins
    if (typeof msg === 'string' || msg.hasOwnProperty('text')) {
      const text = msg.text || msg;
      // eslint-disable-next-line no-shadow
      setMessages((messages) => [...messages, text]);
    }
  };

  const sendMessage = (m) => {
    if (m) {
      PubNubClient.publish({ channel: channels[0], message: m }).then(() =>
        setMessage('')
      );
    }
  };

  useEffect(() => {
    // Subscribe to PubNub channel
    PubNubClient.addListener({ message: handleMessage });
    PubNubClient.subscribe({ channels });

    PubNubClient.addListener({
      status: (event) => {
        const { category } = event;
        if (category === 'PNNetworkDownCategory') {
          setConnected(false);
        } else if (
          category === 'PNNetworkUpCategory' ||
          category === 'PNConnectedCategory'
        ) {
          setConnected(true);
        }
      },
    });

    return function cleanup() {
      PubNubClient.unsubscribeAll();
    };
  }, [PubNubClient, channels]);

  return (
    <>
      <ul className={styles.chats}>
        {messages &&
          messages.map((msg, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`msg-${index}`} className={styles.chat}>
                {msg}
              </li>
            );
          })}
      </ul>

      <div className={styles.connectionStatus}>
        {(connected && (
          <>
            <span className={styles.connected} /> Chat connected!
          </>
        )) || (
          <>
            <span className={styles.warning}>⚠</span> Connection lost... Check
            your Wi-Fi.
          </>
        )}
      </div>

      {authenticated && (
        <>
          <input
            type="text"
            placeholder="Type your message"
            value={message}
            onKeyPress={(e) => {
              if (e.key !== 'Enter') return;
              sendMessage(message);
            }}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="button"
            className="button primary round has-icon"
            onClick={(e) => {
              e.preventDefault();
              sendMessage(message);
            }}
          >
            Send <span>&rarr;</span>
          </button>
        </>
      )}
    </>
  );
}

export default Bracket;

Bracket.propTypes = {
  authenticated: PropTypes.bool,
};

Bracket.defaultProps = {
  authenticated: false,
};
