import { useState, useEffect } from 'react';
import { usePubNub } from 'pubnub-react';

function Bracket() {
  const PubNubClient = usePubNub();

  // const [time, setTime] = useState('Loading');
  const [channels] = useState(['awesome-channel']);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessage = (event) => {
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
    PubNubClient.addListener({ message: handleMessage });
    PubNubClient.subscribe({ channels });
  }, [PubNubClient, channels]);

  return (
    <div>
      <h2>Chat:</h2>

      <div>
        {messages &&
          messages.map((msg, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={`msg-${index}`}>{msg}</div>
            );
          })}
      </div>
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
    </div>
  );
}

export default Bracket;
