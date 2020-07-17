import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import styles from './nope.module.sass';

import prioryPressLogo from '../assets/images/press.svg';

const currentHour = new Date().getHours();
let greetingMessage;

if (currentHour >= 4 && currentHour < 12) {
  // after 4:00AM and before 12:00PM
  greetingMessage = 'good morning';
} else if (currentHour >= 12 && currentHour <= 17) {
  // after 12:00PM and before 6:00pm
  greetingMessage = 'good afternoon';
} else if (currentHour > 17 || currentHour < 4) {
  // after 5:59pm or before 4:00AM (to accommodate night owls)
  greetingMessage = 'good evening';
} else {
  // if for some reason the calculation didn't work
  greetingMessage = 'welcome';
}

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

function Press() {
  const [submitted, setSubmitted] = useState(false);

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
    evt.preventDefault();

    const form = evt.target;

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
      .then(() => {
        // Reset form fields
        resetName();
        resetStudentForm();
        resetEmail();
        resetMessage();
      })
      .then(() => {
        // Show message saying the form was submitted
        // and hide the form
        setSubmitted(true);
      })
      .catch((error) => alert(error));
  };

  return (
    <div className={[styles.wrapper, 'page--purple'].join(' ')}>
      <img src={prioryPressLogo} alt="The Priory Press" />
      <h1 style={{ display: 'none', visibility: 'hidden' }}>
        The Priory Press
      </h1>
      <p>
        First off, {`${greetingMessage}`} and thanks for your interest in{' '}
        <b>The Priory Press</b>!
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
          <form
            method="post"
            name="priory-press-interest"
            netlify
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="bot-field" />

            <label htmlFor="name">
              Name
              <input
                type="text"
                name="name"
                placeholder="Samuel Serif"
                {...bindName}
              />
            </label>

            <label htmlFor="name">
              Form (Fall 2020 - Spring 2021)
              <select {...bindStudentForm}>
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

            <label htmlFor="email" {...bindEmail}>
              Email Address
              <input
                type="email"
                name="email"
                placeholder="samuel.serif@example.com"
              />
            </label>

            <label htmlFor="message" {...bindMessage}>
              What are you interested in writing about? Do you have a title or
              short description?
              <textarea name="message" />
            </label>

            <button type="submit" className="button primary round has-icon">
              Send <span>&rarr;</span>
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
export default Press;
