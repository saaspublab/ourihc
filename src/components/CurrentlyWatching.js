import { useState, useEffect } from 'react';
import { usePubNub } from 'pubnub-react';

function CurrentlyWatching() {
  const PubNubClient = usePubNub();

  // PubNub data
  // const [connected, setConnected] = useState(false);
  const [channels] = useState(['triviaPresence']);
  const [occupants, setOccupants] = useState();

  useEffect(() => {
    // Find current occupants
    PubNubClient.hereNow({ channels }, (status, response) => {
      if (!status.error) {
        setOccupants(response.channels[channels[0]].occupancy);
      }
    });

    // Subscribe to PubNub channel
    PubNubClient.addListener({
      presence: (event) => {
        const { action } = event;
        const channelName = event.channel;
        const { occupancy } = event;

        // eslint-disable-next-line no-console
        console.log(
          `%c[Presence] %c ${action}: ${channelName} | Occupancy: ${occupancy}`,
          'color: #3D9970',
          'color: unset'
        );

        setOccupants(occupancy);
      },
    });

    PubNubClient.subscribe({
      channels,
      withPresence: true,
    });

    return function cleanup() {
      PubNubClient.unsubscribe(channels);
      PubNubClient.stop();
    };
  }, []);

  return (
    <>
      {occupants ? (
        <>
          {occupants - 1} other {occupants === 2 ? 'person is' : 'people are'}{' '}
          currently following along with you.
        </>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}

export default CurrentlyWatching;
