import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePubNub } from 'pubnub-react';
import styles from './chat.module.sass';

function CurrentlyWatching({ descriptionStyles }) {
  const PubNubClient = usePubNub();

  // PubNub data
  const [connected, setConnected] = useState(false);
  const [channels] = useState(['trivia']);
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
          `%c[Presence] %c${action}: ${channelName} | Occupancy: ${occupancy}`,
          'color: #3D9970',
          'color: unset'
        );

        setOccupants(occupancy);
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
        <p className={descriptionStyles}>
          {connected ? occupants - 1 : 'No'} other{' '}
          {occupants === 2 ? 'person is' : 'people are'} currently following
          along with you.
        </p>
      ) : (
        <>Loading...</>
      )}

      {!connected && (
        <div className={styles.connectionStatus}>
          <span className={styles.warning}>⚠</span> Connection lost... Check
          your Wi-Fi.
        </div>
      )}
    </>
  );
}

export default CurrentlyWatching;

CurrentlyWatching.propTypes = {
  descriptionStyles: PropTypes.string,
};

CurrentlyWatching.defaultProps = {
  descriptionStyles: '',
};
