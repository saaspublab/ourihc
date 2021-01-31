import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePubNub } from 'pubnub-react';
import useSound from 'use-sound';
import styles from './chat.module.sass';

import pingSfx from '../assets/sounds/continue.mp3';

function Chat({ participant }) {
  const PubNubClient = usePubNub();

  const [clockTime, setClockTime] = useState();
  const [buzzes, setBuzzes] = useState(0);
  const [inCooldown, setInCooldown] = useState(false);

  // PubNub data
  const [connected, setConnected] = useState(false);
  const [channels] = useState(['triviaBuzzer']);
  const [messages, setMessages] = useState([]);

  // Sounds
  const [playPing] = useSound(pingSfx, {
    volume: 0.5,
  });

  const handleBuzz = (event) => {
    if (event.channel === channels[0]) {
      const msg = event.message;
      // eslint-disable-next-line no-prototype-builtins
      if (typeof msg === 'string' || msg.hasOwnProperty('text')) {
        const text = msg.text || msg;
        // eslint-disable-next-line no-shadow
        setMessages((messages) => [
          ...messages,
          { name: text, time: event.timetoken },
        ]);
        // eslint-disable-next-line no-console
        console.log(
          '%c[Buzzer] %cBuzz received',
          'color: #B10DC9',
          'color: unset'
        );
      }
    }
  };

  const sendBuzz = (m) => {
    setBuzzes(buzzes + 1);

    if (m) {
      PubNubClient.publish({ channel: channels[0], message: m });
    }
  };

  const clock = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = `0${date.getMinutes()}`;
    const seconds = `0${date.getSeconds()}`;

    return setClockTime(`${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`);
  };

  const formatUnixTimestamp = (timestamp) => {
    // Convert seconds to milliseconds
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = `0${date.getMinutes()}`;
    const seconds = `0${date.getSeconds()}`;
    const milliseconds = `0${date.getMilliseconds()}`;

    return `${hours}:${minutes.substr(-2)}:${seconds.substr(
      -2
    )}:${milliseconds.substr(-2)}`;
  };

  useEffect(() => {
    // Auto-update clock
    const clockInterval = setInterval(clock, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    setInCooldown(true);

    const cooldownInterval = setInterval(() => {
      setInCooldown(false);
      clearInterval(cooldownInterval);
    }, 2500);

    return () => clearInterval(cooldownInterval);
  }, [buzzes]);

  useEffect(() => {
    // Subscribe to PubNub channel
    PubNubClient.addListener({
      message: handleBuzz,
      status: (event) => {
        const { category } = event;

        if (category === 'PNConnectedCategory') {
          setConnected(true);

          // eslint-disable-next-line no-console
          console.log(
            '%c[Buzzer] %cConnected ✓',
            'color: #B10DC9',
            'color: #2ECC40'
          );
        } else if (
          category === 'PNNetworkUpCategory' ||
          category === 'PNConnectedCategory'
        ) {
          setConnected(true);
        } else if (category === 'PNNetworkDownCategory') {
          setConnected(false);
        }
      },
    });
    PubNubClient.subscribe({ channels, withPresence: true });

    return function cleanup() {
      PubNubClient.unsubscribe(channels);
      PubNubClient.stop();
    };
  }, [PubNubClient, channels]);

  useEffect(() => {
    // Play sound effect when new message received
    playPing();
  }, [messages]);

  return (
    <>
      <span className={styles.clock}>{clockTime || 'Clock loading...'}</span>

      <ul className={[styles.chats, 'chats'].join(' ')}>
        {messages &&
          messages
            .filter(
              (msg) =>
                new Date() - new Date((msg.time / 10000000) * 1000) < 60000
            )
            .map((msg, index) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <li key={`msg-${index}`} className={styles.chat}>
                  <b>{msg.name}</b> — {formatUnixTimestamp(msg.time / 10000000)}
                </li>
              );
            })}
      </ul>

      {participant && (
        <button
          type="button"
          className="button primary full round has-icon"
          onClick={(e) => {
            e.preventDefault();
            sendBuzz(participant);
          }}
          disabled={inCooldown || !connected}
          style={{ marginTop: '1rem' }}
        >
          BUZZ! <span>&rarr;</span>
        </button>
      )}

      <div className={styles.connectionStatus}>
        {connected ? (
          <>
            <span className={styles.connected} /> Buzzer connected!
          </>
        ) : (
          <>
            <span className={styles.warning}>⚠</span> Connection lost... Check
            your Wi-Fi.
          </>
        )}
      </div>
    </>
  );
}

export default Chat;

Chat.propTypes = {
  participant: PropTypes.string,
};

Chat.defaultProps = {
  participant: '',
};
