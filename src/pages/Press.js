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

function Press(props) {
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
        name,
        studentForm,
        email,
        message,
      }),
    })
      // .then(() => navigateTo(form.getAttribute('action')))
      .catch((error) => alert(error));

    // Reset form fields
    resetName();
    resetStudentForm();
    resetEmail();
    resetMessage();
  };

  return (
    <div className={[styles.wrapper, 'page--purple'].join(' ')}>
      <img src={prioryPressLogo} alt="The Priory Press" />
      <h1 style={{ display: 'none', visibility: 'hidden' }}>
        The Priory Press
      </h1>
      <p>First off, {`${greetingMessage}!`}</p>

      <section className="content--block bordered">
        <h3 className="heading">
          What is <u>The Priory Press</u>?
        </h3>
        <p>
          <b>The Priory Press</b> is a student-led group that specializes in
          publishing the thoughts, creativity, and passion of Abbey students to
          our broader St. Anselm's community.
        </p>
        <p>
          However,{' '}
          <mark>
            this only works when our students rise to the occasion and share
            their thoughts
          </mark>{' '}
          with their fellow brothers.
        </p>
      </section>

      <section className="content--block bordered">
        <h3 className="heading">What are we seeking?</h3>
        <p>
          <mark>We're looking to capture more voices</mark> from more students,
          so we hope that everybody in our community can be heard.
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
        <h3 className="heading">Are you interested yet?</h3>
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
        <form
          method="post"
          name="contact"
          netlify-honeypot="bot-field"
          data-netlify="true"
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
      </section>
    </div>
  );
}
export default Press;
