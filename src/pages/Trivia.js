import { useEffect } from 'react';
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';

import Greeting from '../components/Greeting';
import Bracket from '../components/Bracket';

const pubNubConfig = require('../pubnub.config.json');

const uuid = PubNub.generateUUID();
const pubnub = new PubNub(pubNubConfig.keySet, { uuid });

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
