import { useEffect } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';

import Greeting from '../components/Greeting';
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

console.log(publishKey, subscribeKey);

const uuid = PubNub.generateUUID();
const pubnub = new PubNub({
  publishKey,
  subscribeKey,
  uuid,
});

function Discord() {
  useEffect(() => {
    document.title = 'Join Our Discord!';
  }, []);

  return (
    <>
      <h1 style={{ display: 'none', visibility: 'hidden' }}>
        The Abbey Discord
      </h1>
      <p>
        <Greeting case="sentence" />!
      </p>

      <PubNubProvider client={pubnub}>
        <Bracket />
      </PubNubProvider>
    </>
  );
}

export default Discord;
