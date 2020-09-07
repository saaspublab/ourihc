import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import useStickyState from '../components/UseStickyState';
import styles from './nope.module.sass';

const houses = ['Unknown (New Students)', 'Alban', 'Austin', 'Main', 'Moore'];
const passwords = [
  'Abbey2020',
  'AudacesFortunaIuvat',
  'SemperOptimi',
  'SemperDominatus',
  'QuiAudetVincit',
];

function Hunt() {
  const [house, pickHouse] = useStickyState('', 'house');
  const [copied, setCopied] = useState(false);

  return (
    <div className={[styles.wrapper, 'page--purple'].join(' ')}>
      <h4>House Day Week:</h4>
      <h1>Scavenger Hunt</h1>
      <p>
        <b>This year, House Day is starting early!</b> A new riddle will be
        posted each day this week. Figure out and post your answer before the
        day ends. Only members of your house can check your house's progress.
      </p>

      {(!house || !houses.includes(house)) && (
        <section className="content--block bordered">
          <h3 className="heading">Which House are you in?</h3>
          <p>
            <i>
              Once you make a selection you will not be able to change it.
              Remember that viewing another house's board may disqualify you and
              all of your house.
            </i>
          </p>

          <br />

          {houses.map((h) => (
            <button
              key={`${h}-${Math.random()}`}
              onClick={() => pickHouse(h)}
              type="button"
              className="button hollow primary round has-icon"
              style={{ marginRight: '1rem', marginBottom: '1rem' }}
            >
              {h} <span>&rarr;</span>
            </button>
          ))}
        </section>
      )}

      {house.length > 1 && houses.includes(house) && (
        <>
          {houses.map((h, i) => (
            <>
              {h === house && (
                <section
                  key={`${h}-${Math.random()}`}
                  className="content--block bordered"
                >
                  <h3 className="heading">{h} House</h3>

                  <p>
                    Instructions and more information can be found at the far
                    left of your House's board. If you have any questions, reach
                    out to us on <Link to="/discord">Discord</Link> or{' '}
                    <a
                      href="//instagram.com/inter.house.council"
                      target="blank"
                      rel="noopener noreferrer nofollow"
                    >
                      Instagram
                    </a>
                    .
                  </p>

                  <p>
                    Super secret password:{' '}
                    <mark>
                      <kbd>{passwords[i]}</kbd>
                    </mark>
                    <CopyToClipboard
                      text={passwords[i]}
                      onCopy={() => setCopied(true)}
                      style={{ marginLeft: '.75rem' }}
                    >
                      <button
                        className="button primary link round"
                        type="button"
                      >
                        {copied ? 'Copied! ✅' : 'Copy?'}
                      </button>
                    </CopyToClipboard>
                  </p>
                  <br />
                  <a
                    href={`//padlet.com/ourihc/hdhunt_${
                      h === 'Unknown (New Students)'
                        ? 'unknown'
                        : h.toLowerCase()
                    }`}
                    target="blank"
                    rel="noopener noreferrer nofollow"
                    className="button primary round has-icon"
                  >
                    Open Board <span>&rarr;</span>
                  </a>
                </section>
              )}
            </>
          ))}
        </>
      )}
    </div>
  );
}

export default Hunt;
