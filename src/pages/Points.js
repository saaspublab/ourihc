import React, { useState, useEffect } from 'react';
import { readRemoteFile } from 'react-papaparse';
import styles from './points.module.sass';

import albanImage from '../assets/images/alban.png';
import austinImage from '../assets/images/austin.png';
import mainImage from '../assets/images/main.png';
import mooreImage from '../assets/images/moore.png';

function returnImageByHouse(house) {
  const houseName = house.toLowerCase();
  let value;

  switch (houseName) {
    case 'alban':
      value = albanImage;
      break;

    case 'austin':
      value = austinImage;
      break;

    case 'main':
      value = mainImage;
      break;

    case 'moore':
      value = mooreImage;
      break;

    default:
      break;
  }

  return value;
}

function Points() {
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    readRemoteFile(
      'https://docs.google.com/spreadsheets/d/1uJ1FJpdEjmBqSRF5HlU7FCNppilwT_TPPpRDEabbzvI/gviz/tq?tqx=out:csv&sheet=Sheet1',
      {
        headers: true,
        complete(results) {
          setFileData(results);
        },
      }
    );
  }, []);

  return (
    <section>
      <div className={styles.points}>
        {(fileData &&
          fileData.data.map((entry, i) => (
            <React.Fragment key={entry[0].toLowerCase()}>
              {i < 4 && (
                <div className={styles.house}>
                  <h2 className={`color--${entry[0].toLowerCase()}`}>
                    {entry[0]}
                  </h2>
                  <img
                    src={returnImageByHouse(entry[0])}
                    alt={`${entry[0]} House`}
                  />
                  <p
                    className={`color--tablet color--${entry[0].toLowerCase()}`}
                  >
                    {entry[1]}
                  </p>
                </div>
              )}
            </React.Fragment>
          ))) || <h3>Loading points data...</h3>}
      </div>

      <footer className={styles.footer}>
        <p>
          <em>
            Last updated: {(fileData && fileData.data[4]) || 'Loading...'}
          </em>
        </p>
      </footer>
    </section>
  );
}

export default Points;
