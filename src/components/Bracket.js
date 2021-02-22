/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { useState, useEffect, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import useSound from 'use-sound';
import useStickyState from '../hooks/UseStickyState';

import styles from './bracket.module.sass';

// Sounds
import updateSfx from '../assets/sounds/update.mp3';

// Constants
const eventSourceUrl = `${process.env.REACT_APP_REALTIME_URL}/realtime?apikey=${process.env.REACT_APP_X_API_KEY}`;

const roundNames = [
  'Rounds of 8',
  'Quarter-Finals',
  'Semi-Finals',
  'Championship',
  'Winner',
];
const round1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const round2 = [0, 1, 2, 3, 4, 5, 6, 7];
const round3 = [0, 1, 2, 3];
const round4 = [0, 1];
const winner = [0];

let forceRefreshHandler;

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      },
    },
  };
};

function Bracket({ fullPage }) {
  let eventSource;

  // Handle user-visible status messages
  const [status, setStatus] = useState([]);

  // Store teams from DB
  const [fetchingTeams, setFetchingTeams] = useState(false);
  const [forceRefreshLock, setForceRefreshLock] = useState();
  const [teams, setTeams] = useState();

  // Store EventStream data
  const [eventSourceIsCurrent, setEventSourceIsCurrent] = useState(false);
  const [lastPing, setLastPing] = useState();
  const lastPingRef = useRef(lastPing);
  const setLastPingWithRef = (data) => {
    lastPingRef.current = data;
    setLastPing(data);
  };

  // Sounds
  const [playUpdate] = useSound(updateSfx, {
    volume: 0.5,
  });

  // Feedback form
  const [feedbackPanel, setFeedbackPanel] = useState(true);
  const [formSubmitted, setFormSubmitted] = useStickyState(
    false,
    'submittedTTFeedback'
  );
  const [formError, setFormError] = useState(false);

  async function fetchTeams() {
    setFetchingTeams(true);
    console.log(
      '%c[Teams] %cFetching from DB...',
      'color: #F012BE',
      'color: #7FDBFF'
    );

    await fetch('/api/teams/')
      .then((res) => res.json())
      .then((res) => {
        setFetchingTeams(false);
        setTeams(res.teams);
        console.log(
          '%c[Teams] %cFetch successful ✓',
          'color: #F012BE',
          'color: #2ECC40'
        );
      })
      .catch((err) => {
        setFetchingTeams(false);
        setStatus([
          'warning',
          'Unable to load bracket data. Please try refreshing the page.',
        ]);

        console.error('', err);
      });
  }

  function startEventSource() {
    // Open eventSource stream only if initial data has been received
    // Establish realtime RestDB connection
    eventSource = new EventSource(eventSourceUrl);

    // check if the realtime connection is dead, reload client if dead
    setInterval(() => {
      const now = new Date().getTime();
      const diff = (now - lastPing) / 1000;

      // Last heard from server 20+ seconds ago
      if (diff > 20) {
        // It's been 20 seconds. Inform user
        setEventSourceIsCurrent(false);
        setStatus(['warning', 'Connection lost! Attempting to re-connect...']);

        console.warn('Last ping received:', lastPing, ' — Time since:', diff);
      } else {
        setEventSourceIsCurrent(true);
      }

      // Last heard from server 90+ seconds ago
      if (diff > 120) {
        // It's been 120 seconds. Manually refresh data
        fetchTeams();

        // Close eventSource stream
        eventSource.close();

        // Reopen evenSource stream
        eventSource = new EventSource(eventSourceUrl);
      }
    }, 10000);

    // Catch open
    eventSource.onopen = () => {
      setEventSourceIsCurrent(true);
      console.log(
        '%c[EventSource] %cConnection established ✓',
        'color: #0074D9',
        'color: #2ECC40'
      );
    };

    // Catch errors
    eventSource.onerror = () => {
      setEventSourceIsCurrent(false);
      setStatus([
        'warning',
        'Unable to establish an auto-updating connection. Please try refreshing the page.',
      ]);

      // Close eventSource stream
      eventSource.close();
    };

    // listen on ping from server, keep time
    eventSource.addEventListener(
      'ping',
      (e) => {
        setLastPingWithRef(new Date(e.data).getTime());

        console.log(
          `%c[DB Ping] %cReceived at ${lastPingRef.current}`,
          'color: #0074D9',
          'color: unset'
        );
      },
      false
    );

    // listen for database REST operations
    eventSource.addEventListener(
      'put',
      () => {
        console.log(
          '%c[DB PUT] %cRefreshing...',
          'color: #0074D9',
          'color: #7FDBFF'
        );

        // Reload database data
        fetchTeams();
      },
      false
    );
  }

  function forceRefresh() {
    // Fetch teams from API
    fetchTeams();

    // Start "Force Refresh" button lock timeout
    setForceRefreshLock(true);
    forceRefreshHandler = setTimeout(() => {
      setForceRefreshLock(false);
    }, 120000);
  }

  useEffect(() => {
    // Fetch teams from API
    fetchTeams();

    // Start "Force Refresh" button lock timeout
    setForceRefreshLock(true);
    forceRefreshHandler = setTimeout(() => {
      setForceRefreshLock(false);
    }, 120000);

    // Establish live eventSource feed
    startEventSource();

    return () => {
      if (forceRefreshHandler) {
        clearTimeout(forceRefreshHandler);
        forceRefreshHandler = 0;
      }
    };
  }, []);

  useEffect(() => {
    // Play sound effect when teams are updated
    playUpdate();
  }, [teams]);

  const {
    value: feedback,
    bind: bindFeedback,
    reset: resetFeedback,
  } = useInput('');
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');

  const handleSubmit = (evt) => {
    const form = evt.target;

    if (!(feedback && email)) {
      setFormError('All fields are required.');
    } else if (feedback.length <= 5) {
      setFormError('Your feedback seems a bit short.');
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setFormError('Your email address is invalid.');
    } else {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': form.getAttribute('name'),
          feedback: `${feedback}`,
          email: `${email}`,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            setFormError('The server responded with a non-2xx code.');
            setFormSubmitted(false);
          } else {
            // Reset form fields
            resetFeedback();
            resetEmail();

            // Show message saying the form was submitted
            // and hide the form
            setFormSubmitted(true);
          }
        })
        .catch((err) => {
          setFormError(err);
          setFormSubmitted(false);
        });
    }

    evt.preventDefault();
  };

  function closeFeedback() {
    setFeedbackPanel(false);
  }

  return (
    <div>
      {/* Tournament Bracket
       * Thanks to Shaun Dowling
       * https://codepen.io/efy/pen/RRRyJW
       */}

      <div className={styles.connectionStatus}>
        {(fetchingTeams && (
          <div className={styles.content}>
            <span className={styles.loading} /> Establishing connection...
          </div>
        )) ||
          (status && status.length === 2 && (
            <div className={styles.content}>
              {status[0] === 'warning' && (
                <>
                  <span className={styles.warning}>⚠</span> {status[1]}
                </>
              )}
            </div>
          )) ||
          (eventSourceIsCurrent && (
            <div className={styles.content}>
              <span className={styles.connected} /> Bracket connected &amp;
              updating live!
              {!forceRefreshLock && (
                <span className={styles.refresh}>
                  {' ['}
                  <button
                    type="button"
                    className={['link', styles.refreshButton].join(' ')}
                    onClick={() => forceRefresh()}
                    disabled={forceRefreshLock}
                  >
                    Force Refresh...
                  </button>
                  ]
                </span>
              )}
            </div>
          )) ||
          (teams && (
            <div className={styles.content}>
              <span className={styles.connected} /> Bracket loaded!
            </div>
          ))}
      </div>

      <section className="tournament-container">
        {!fullPage &&
          teams &&
          teams.filter((team) => {
            return team.winner === true;
          }).length > 0 &&
          feedbackPanel && (
            <div className="bracket-overlay">
              <div className="overlay-content">
                <p>
                  Congratulations{' '}
                  <b className={styles.winningTeam}>
                    {teams &&
                      teams.filter((team) => {
                        return team.winner === true;
                      })[0].name}
                  </b>
                  !
                </p>

                <p>
                  <button
                    className="button primary small round"
                    type="button"
                    onClick={() => closeFeedback()}
                  >
                    CLOSE ×
                  </button>
                </p>

                <div className={styles.feedback}>
                  <h3>Share Your Thoughts:</h3>
                  {formSubmitted ? (
                    <p className={styles.thanksForFeedback}>
                      ✓ Thanks for your feedback!{' '}
                      <span>
                        [
                        <button
                          className={['link', styles.closeFeedbackButton].join(
                            ' '
                          )}
                          type="button"
                          onClick={() => closeFeedback()}
                        >
                          CLOSE
                        </button>
                        ]
                      </span>
                    </p>
                  ) : (
                    <>
                      <form
                        method="post"
                        name="trivia-tournament-feedback"
                        onSubmit={handleSubmit}
                      >
                        <input
                          type="hidden"
                          name="form-name"
                          value="trivia-tournament-feedback"
                        />
                        <input type="hidden" name="bot-field" />
                        <label htmlFor="feedback">
                          What did you think of this event?
                          <input
                            type="text"
                            name="feedback"
                            id="feedback"
                            placeholder="Let Us Know..."
                            required
                            {...bindFeedback}
                          />
                        </label>

                        <label
                          htmlFor="email"
                          className={[
                            styles.formElement,
                            feedback.length > 5 ? '' : styles.hidden,
                          ].join(' ')}
                        >
                          What's your email?
                          <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="example@saintanselms.org"
                            required
                            {...bindEmail}
                          />
                        </label>

                        <p
                          className={[
                            styles.error,
                            formError ? '' : styles.hidden,
                          ].join(' ')}
                        >
                          ⚠️ {formError} Please try again.
                        </p>

                        <button
                          type="submit"
                          className={[
                            'button primary round has-icon full',
                            styles.formElement,
                            feedback.length > 5 && email.length > 10
                              ? ''
                              : styles.hidden,
                          ].join(' ')}
                          disabled={!feedback || !email}
                        >
                          Submit! <span>&rarr;</span>
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

        <div className="tournament-headers">
          {roundNames.map((round) => (
            <h3 key={round.toLowerCase()}>{round}</h3>
          ))}
        </div>

        <div className="tournament-brackets">
          <ul className="bracket bracket-1">
            {round1.map((round, i) => (
              <Fragment key={`round1-${round}`}>
                {round % 2 === 0 && (
                  <li className="team-item">
                    <ul className="teams">
                      <li>
                        {teams &&
                        teams.filter((team) => {
                          return team.round1 === true;
                        }).length > i
                          ? teams.filter((team) => {
                              return team.round1 === true;
                            })[i].name
                          : '???'}
                      </li>
                      <li>
                        {teams &&
                        teams.filter((team) => {
                          return team.round1 === true;
                        }).length >
                          i + 1
                          ? teams.filter((team) => {
                              return team.round1 === true;
                            })[i + 1].name
                          : '???'}
                      </li>
                    </ul>
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
          <ul className="bracket bracket-2">
            {round2.map((round, i) => (
              <Fragment key={`round2-${round}`}>
                {round % 2 === 0 && (
                  <li className="team-item">
                    <ul className="teams">
                      <li>
                        {teams &&
                        teams.filter((team) => {
                          return team.round2 === true;
                        }).length > i
                          ? teams.filter((team) => {
                              return team.round2 === true;
                            })[i].name
                          : '???'}
                      </li>
                      <li>
                        {teams &&
                        teams.filter((team) => {
                          return team.round2 === true;
                        }).length >
                          i + 1
                          ? teams.filter((team) => {
                              return team.round2 === true;
                            })[i + 1].name
                          : '???'}
                      </li>
                    </ul>
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
          <ul className="bracket bracket-3">
            {round3.map((round, i) => (
              <Fragment key={`round3-${round}`}>
                {round % 2 === 0 && (
                  <li className="team-item">
                    <ul className="teams">
                      <li>
                        {teams &&
                        teams.filter((team) => {
                          return team.round3 === true;
                        }).length > i
                          ? teams.filter((team) => {
                              return team.round3 === true;
                            })[i].name
                          : '???'}
                      </li>
                      <li>
                        {teams &&
                        teams.filter((team) => {
                          return team.round3 === true;
                        }).length >
                          i + 1
                          ? teams.filter((team) => {
                              return team.round3 === true;
                            })[i + 1].name
                          : '???'}
                      </li>
                    </ul>
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
          <ul className="bracket bracket-4">
            {round4.map((round, i) => (
              <Fragment key={`round4-${round}`}>
                {round % 2 === 0 && (
                  <li className="team-item">
                    <ul className="teams">
                      <li>
                        {teams &&
                        teams.filter((team) => {
                          return team.round4 === true;
                        }).length > i
                          ? teams.filter((team) => {
                              return team.round4 === true;
                            })[i].name
                          : '???'}
                      </li>
                      <li>
                        {teams &&
                        teams.filter((team) => {
                          return team.round4 === true;
                        }).length >
                          i + 1
                          ? teams.filter((team) => {
                              return team.round4 === true;
                            })[i + 1].name
                          : '???'}
                      </li>
                    </ul>
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
          <ul className="bracket bracket-5">
            {winner.map((round, i) => (
              <Fragment key={`winner-${round}`}>
                {round % 2 === 0 && (
                  <li className="team-item">
                    {teams &&
                    teams.filter((team) => {
                      return team.winner === true;
                    }).length > i
                      ? teams.filter((team) => {
                          return team.winner === true;
                        })[i].name
                      : '???'}
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Bracket;

Bracket.propTypes = {
  fullPage: PropTypes.bool,
};

Bracket.defaultProps = {
  fullPage: false,
};
