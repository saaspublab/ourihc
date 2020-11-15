import { useState } from 'react';
import styles from '../nope.module.sass';
import prioryPressLogo from '../../assets/images/press.svg';

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

function PressInfo() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const { value: name, bind: bindName, reset: resetName } = useInput('');
  const {
    value: studentForm,
    bind: bindStudentForm,
    reset: resetStudentForm,
  } = useInput('unknown');
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput('');
  const { value: message, bind: bindMessage, reset: resetMessage } = useInput(
    ''
  );

  const handleSubmit = (evt) => {
    const form = evt.target;

    if (!(name && studentForm && email && message)) {
      setError('All fields are required.');
    } else if (name.length < 3) {
      setError('Please enter a valid name');
    } else if (studentForm === 'unknown') {
      setError('Please select your form.');
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError('Please enter a valid email address.');
    } else if (message.length < 10) {
      setError(
        "Please elaborate a bit more on your idea so we can better understand your interests. (You'll need to enter at least 10 characters to submit this form)"
      );
    } else {
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': form.getAttribute('name'),
          name: `${name}`,
          'student-form': `${studentForm}`,
          email: `${email}`,
          message: `${message}`,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            setError('The server responded with a non-2xx code.');
            setSubmitted(false);
          } else {
            // Reset form fields
            resetName();
            resetStudentForm();
            resetEmail();
            resetMessage();

            // Show message saying the form was submitted
            // and hide the form
            setSubmitted(true);
          }
        })
        .catch((err) => {
          setError(err);
          setSubmitted(false);
        });
    }

    evt.preventDefault();
  };

  return (
    <div className={[styles.wrapper, 'page--purple'].join(' ')}>
      <img src={prioryPressLogo} alt="The Priory Press" />
      <h1 style={{ display: 'none', visibility: 'hidden' }}>
        The Priory Press
      </h1>
      <p>
        Thanks for your interest in <b>The Priory Press</b>!
      </p>

      <section className="content--block bordered">
        <h3 className="heading">What is it?</h3>
        <p>
          <b>The Priory Press</b> is a student-led group that specializes in
          publishing the <mark>thoughts, creativity, and passion</mark> of Abbey
          students to our broader St. Anselm's community.
        </p>
      </section>

      <section className="content--block bordered">
        <h3 className="heading">What are we seeking?</h3>
        <p>
          This only works when our students rise to the occasion and share their
          thoughts with their fellow brothers.{' '}
          <mark>We're looking to ignite and capture more involvement</mark> from
          more students, empowering each student in our community to be heard.
        </p>
      </section>

      <section className="content--block bordered">
        <h3 className="heading">What articles do we accept?</h3>
        <p>
          We publish a wide variety of topics. Want to report on political
          topics? That's fine. Want to share an analysis on a book, song, or
          movie you feel passionate about? That's fine.{' '}
          <mark>
            No matter the topic, let us know your interest and we'll get back to
            you.
          </mark>
        </p>
      </section>

      <section className="content--block bordered">
        <h3 className="heading">Interested yet?</h3>
        <p>
          If so,{' '}
          <mark>
            take a moment to let us know who you are and what you might want to
            write
          </mark>{' '}
          &mdash; your submission is non-binding, just a signal of interest.
        </p>
      </section>

      <section className="content--block">
        {submitted ? (
          <div className="background--off-white">
            <h2 className="heading">Thanks for your reaching out!</h2>
            <p>
              Your interest has been recorded and we look forward to working
              with you. If you have any questions, don't hesitate to reach out
              to us on Instagram{' '}
              <a
                href="//www.instagram.com/inter.house.council/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @inter.house.council
              </a>
            </p>
          </div>
        ) : (
          <>
            {error && (
              <div className="background--off-white">
                <h2 className="heading">
                  Oh no! There was an issue recording your interest...
                </h2>
                <pre>{error}</pre>
                <p>
                  Unfortunately an error was encountered. Please try again. If
                  the issue persists, please reach out to us on Instagram{' '}
                  <a
                    href="//www.instagram.com/inter.house.council/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @inter.house.council
                  </a>{' '}
                  and pass along the above diagnostic information.
                </p>
              </div>
            )}
            <form
              method="post"
              name="priory-press-interest"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="bot-field" />

              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  placeholder="Samuel Serif"
                  required
                  minLength={3}
                  {...bindName}
                />
              </label>

              <label htmlFor="studentForm">
                Form (Fall 2020 - Spring 2021)
                <select name="studentForm" {...bindStudentForm} required>
                  <option disabled value="unknown">
                    Click to select &rarr;
                  </option>
                  <option value="a">A</option>
                  <option value="i">I</option>
                  <option value="ii">II</option>
                  <option value="iii">III</option>
                  <option value="iv">IV</option>
                  <option value="v">V</option>
                  <option value="vi">VI</option>
                </select>
              </label>

              <label htmlFor="email">
                Email Address
                <input
                  type="email"
                  name="email"
                  placeholder="samuel.serif@example.com"
                  required
                  {...bindEmail}
                />
              </label>

              <label htmlFor="message">
                What are you interested in writing about? Do you have a title or
                short description?
                <textarea
                  name="message"
                  {...bindMessage}
                  required
                  pattern=".{10,500}"
                />
              </label>

              {error && (
                <div className="background--off-white">
                  <h2 className="heading">
                    Oh no! There was an issue recording your interest...
                  </h2>
                  <pre>{error}</pre>
                  <p>
                    Unfortunately an error was encountered. Please try again. If
                    the issue persists, please reach out to us on Instagram{' '}
                    <a
                      href="//www.instagram.com/inter.house.council/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @inter.house.council
                    </a>{' '}
                    and pass along the above diagnostic information.
                  </p>
                </div>
              )}

              <button type="submit" className="button primary round has-icon">
                Record My Interest! <span>&rarr;</span>
              </button>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
export default PressInfo;
