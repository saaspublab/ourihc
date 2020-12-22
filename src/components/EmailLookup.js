/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import useStickyState from '../hooks/UseStickyState';
import Greeting from './Greeting';

export const useInput = (initialValue) => {
  const [value, setValue] = useStickyState(initialValue, 'email');

  return {
    value,
    setValue,
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      },
    },
  };
};

// eslint-disable-next-line react/prop-types
function EmailLookup({ sendDataToParent }) {
  const { value: email, bind: bindEmail } = useInput('@saintanselms.org');
  const [students, setStudents] = useState({});
  const [nickname, setNickname] = useState('');
  const [house, setHouse] = useState('');
  const [triviaAdmin, setTriviaAdmin] = useState(false);

  async function fetchStudents() {
    await fetch('/api/emails/')
      .then((res) => res.json())
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (
      isMounted &&
      students.length > 1 &&
      email.length > 1 &&
      students.filter((e) => e.emailAddress === email).length > 0
    ) {
      setNickname(students.find((obj) => obj.emailAddress === email).nickname);
      setHouse(students.find((obj) => obj.emailAddress === email).house);
      setTriviaAdmin(
        students.find((obj) => obj.emailAddress === email).triviaAdmin || false
      );
      sendDataToParent({ email, nickname, house, triviaAdmin });
    }

    return function cleanup() {
      isMounted = false;
    };
  }, [students, email, nickname, house, triviaAdmin]);

  return (
    <>
      {!students ||
        (!students.length && (
          <section className="bordered">
            <h3 className="heading">Loading... Please wait...</h3>
            <p>
              If this message remains for more than 10 seconds, please message
              us on <Link to="/discord">Discord</Link> or by{' '}
              <a
                href="mailto:ihc@saintanselms.org"
                target="_blank"
                rel="noopener noreferrer nofoollow"
              >
                email (ihc@saintanselms.org)
              </a>
              .
            </p>
          </section>
        ))}

      {students.length > 1 &&
        (!email ||
          !students.filter((e) => e.emailAddress === email).length > 0) && (
          <section className="bordered">
            <form style={{ margin: 0 }}>
              <label htmlFor="email">
                Your SAAS Email Address
                <input
                  type="email"
                  name="email"
                  placeholder="lserif@saintanselms.org"
                  required
                  {...bindEmail}
                />
              </label>
              <p>
                <b>IMPORTANT:</b> once you type your email address, you will not
                be able to change it.
              </p>
            </form>

            {email.length >= '@saintanselms.org'.length + 3 && (
              <p style={{ marginTop: '1.5rem' }}>
                <b>
                  Hmmm... We weren't able to find a student with that email
                  address.
                </b>{' '}
                Duoble-check your spelling, and if the error persists, message
                us on <Link to="/discord">Discord</Link> or by{' '}
                <a
                  href="mailto:ihc@saintanselms.org"
                  target="_blank"
                  rel="noopener noreferrer nofoollow"
                >
                  email (ihc@saintanselms.org)
                </a>
                .
              </p>
            )}
          </section>
        )}

      {students.length > 1 &&
        email.length > 1 &&
        students.filter((e) => e.emailAddress === email).length > 0 && (
          <>
            <section className="content--block bordered">
              <h3 className="heading" style={{ margin: 0 }}>
                <Greeting case="sentence" />, {nickname} ({house} House)!
              </h3>
            </section>
          </>
        )}
    </>
  );
}

export default EmailLookup;
