import { useState, useEffect } from 'react';
import { usePubNub } from 'pubnub-react';

function Chat() {
  const pubnub = usePubNub();

  const [channels] = useState(['awesome-channel']);
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState('');

  const handleMessage = (event) => {
    const { msg } = event;
    // if (typeof msg === 'string' || msg.hasOwnProperty('text')) {
    if (
      typeof msg === 'string' ||
      // Object.prototype.hasOwnProperty.call(msg, 'text')
      // eslint-disable-next-line no-prototype-builtins
      msg.hasOwnProperty('text')
    ) {
      const text = msg.text || msg;
      console.log('reacged');
      addMessage((msgs) => [...msgs, text]);
    } else {
      console.log('un');
    }
  };

  const sendMessage = (msg) => {
    console.log('sendMessage', msg);
    if (msg) {
      console.log('publish', channels[0], msg);
      pubnub
        .publish({ channel: channels[0], msg })
        .then(() => setMessage(''))
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const pageStyles = {
    alignItems: 'center',
    background: '#efefef',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  const chatStyles = {
    display: 'flex',
    flexDirection: 'column',
    height: '50vh',
    width: '50%',
  };

  const headerStyles = {
    background: '#323742',
    color: 'white',
    fontSize: '1.4rem',
    padding: '10px 15px',
  };

  const listStyles = {
    alignItems: 'flex-start',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'auto',
    padding: '10px',
  };

  const messageStyles = {
    backgroundColor: '#eee',
    borderRadius: '5px',
    color: '#333',
    fontSize: '1.1rem',
    margin: '5px',
    padding: '8px 15px',
  };

  const footerStyles = {
    display: 'flex',
  };

  const inputStyles = {
    flexGrow: 1,
    fontSize: '1.1rem',
    padding: '10px 15px',
  };

  const buttonStyles = {
    fontSize: '1.1rem',
    padding: '10px 15px',
  };

  useEffect(() => {
    pubnub.addListener({ message: handleMessage });
    pubnub.subscribe({ channels });
    console.log(message, channels);
  }, [pubnub, channels]);

  return (
    <div style={pageStyles}>
      <div style={chatStyles}>
        <div style={headerStyles}>React Chat Example</div>
        <div style={listStyles}>
          {messages.map((msg, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={`msg-${index}`} style={messageStyles}>
                {msg}
              </div>
            );
          })}
        </div>
        <div style={footerStyles}>
          <input
            type="text"
            style={inputStyles}
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
            style={buttonStyles}
            onClick={(e) => {
              e.preventDefault();
              sendMessage(message);
            }}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
