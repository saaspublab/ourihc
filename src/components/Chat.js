import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePubNub } from 'pubnub-react';
import useSound from 'use-sound';
import styles from './chat.module.sass';

import pingSfx from '../assets/sounds/continue.mp3';

function Chat({ authenticated }) {
  const PubNubClient = usePubNub();

  // PubNub data
  const [connected, setConnected] = useState(false);
  const [channels] = useState(['trivia']);
  const [isTyping, setIsTyping] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    'Welcome to the Teacher Trivia Tournament, hosted by the IHC!',
  ]);

  // Sounds
  const [playPing] = useSound(pingSfx, {
    volume: 0.5,
  });

  function scrollToBottom() {
    const scrollSection = document.querySelector('.chats');
    scrollSection.scrollTop = scrollSection.scrollHeight;
  }

  const handleTyping = (value) => {
    setMessage(value);

    if (value.length > 2) {
      PubNubClient.setState({
        state: { isTyping: true },
        channels,
      });
    } else {
      PubNubClient.setState({
        state: { isTyping: false },
        channels,
      });
    }
  };

  const handleMessage = (event) => {
    if (event.channel === channels[0]) {
      const msg = event.message;
      // eslint-disable-next-line no-prototype-builtins
      if (typeof msg === 'string' || msg.hasOwnProperty('text')) {
        const text = msg.text || msg;
        // eslint-disable-next-line no-shadow
        setMessages((messages) => [...messages, text]);
        scrollToBottom();
        // eslint-disable-next-line no-console
        console.log(
          '%c[Chat] %cMessage received',
          'color: #B10DC9',
          'color: unset'
        );
      }
    }
  };

  const sendMessage = (m) => {
    if (m) {
      PubNubClient.publish({ channel: channels[0], message: m }).then(() => {
        setMessage('');
        scrollToBottom();
      });
    }
  };

  useEffect(() => {
    // Subscribe to PubNub channel
    PubNubClient.addListener({
      message: handleMessage,
      presence: (event) => {
        const { action } = event;
        const { state } = event;

        if (action === 'state-change') {
          setIsTyping(state.isTyping);
        }
      },
      status: (event) => {
        const { category } = event;

        if (category === 'PNConnectedCategory') {
          setConnected(true);

          // eslint-disable-next-line no-console
          console.log(
            '%c[Chat] %cConnected ✓',
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
      <ul className={[styles.chats, 'chats'].join(' ')}>
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

      {authenticated && (
        <>
          <textarea
            type="text"
            className={styles.chatInput}
            placeholder="Type your message"
            value={message}
            onChange={(e) => handleTyping(e.target.value)}
            rows={3}
          />
          <button
            type="button"
            className={[
              'button primary full round has-icon',
              styles.sendChat,
            ].join(' ')}
            onClick={(e) => {
              e.preventDefault();
              sendMessage(message);
            }}
            disabled={!connected}
          >
            Send <span>&rarr;</span>
          </button>
        </>
      )}

      <div className={styles.connectionStatus}>
        {(isTyping && !authenticated && (
          <>
            <span className={styles.connected} /> The IHC is typing...
          </>
        )) ||
          (connected && (
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
    </>
  );
}

export default Chat;

Chat.propTypes = {
  authenticated: PropTypes.bool,
};

Chat.defaultProps = {
  authenticated: false,
};
