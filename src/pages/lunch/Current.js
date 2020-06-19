import React, { useEffect } from 'react';
// import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../lunch.module.sass';

const moment = require('moment');

// function getDistinctObjectValues(array) {
//   const flags = [];
//   const output = [];
//   const l = array.length;
//   let i;
//   for (i = 0; i < l; i += 1) {
//     if (flags[array[i].age]) continue;
//     flags[array[i].age] = true;
//     output.push(array[i].age);
//   }
// }

function LunchCurrent() {
  // const [currentHouse, setCurrentHouse] = useState('');
  // const [errors, setError] = useState({});
  // const [students, setStudents] = useState({});
  // const [assignments, setAssignments] = useState({});

  // console.log(errors);

  // function fetchAssignments(q) {
  //   let query = q;
  //   if (!query) {
  //     query = '';
  //   }
  //   fetch(`/api/assignments/${query}`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setAssignments(res);
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       setError(err);
  //       // eslint-disable-next-line no-console
  //       console.error(err);
  //     });
  // }

  useEffect(() => {
    document.title = "This Week's Lunch Cleanup";
    // fetchAssignments();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Link to="/lunch" className="button link primary has-icon_left">
        <span>&larr;</span> Back
      </Link>
      <br />
      <br />
      <h2>
        Lunch Cleanup
        {/* {currentHouse && currentHouse !== 'all' && (
          <>
            {' '}
            &mdash;{' '}
            {`${currentHouse.charAt(0).toUpperCase()}${currentHouse.substr(1)}`}
          </>
        )} */}
      </h2>
      <h4>
        This week's assignments &mdash;{' '}
        {moment().startOf('isoweek').format('MMM Do')} &rarr;{' '}
        {moment().startOf('isoweek').add(4, 'days').format('MMM Do')}
      </h4>

      <section className={styles.assignments}>
        <article>
          <header>
            <h6>{moment().startOf('isoweek').format('dddd (M/D)')}</h6>
          </header>
          <div className={styles.inner}>
            {/* {!!assignments.data &&
              assignments.data.map((assignment) => (
                <p key={assignment.date}>
                  {`${assignment.student[0].firstName} ${assignment.student[0].lastName}`}{' '}
                  <span>{assignment.student[0].form}</span>
                </p>
              ))} */}
            <p>
              Malachi Robinson <span>II</span>
            </p>
            <p>
              Derek Williamson <span>A</span>
            </p>
            <h6 className={styles.separator}>
              <span>Lounge</span>
            </h6>
            <p>
              Jay Sella <span>V</span>
            </p>
          </div>
        </article>

        <article>
          <header>
            <h6>
              {moment().startOf('isoweek').add(1, 'days').format('dddd (M/D)')}
            </h6>
          </header>
          <div className={styles.inner}>
            <p>
              Malachi Robinson <span>II</span>
            </p>
            <p>
              Derek Williamson <span>A</span>
            </p>
            <h6 className={styles.separator}>
              <span>Lounge</span>
            </h6>
            <p>
              Jay Sella <span>V</span>
            </p>
          </div>
        </article>

        <article>
          <header>
            <h6>
              {moment().startOf('isoweek').add(2, 'days').format('dddd (M/D)')}
            </h6>
          </header>
          <div className={styles.inner}>
            <p>
              Malachi Robinson <span>II</span>
            </p>
            <p>
              Derek Williamson <span>A</span>
            </p>
            <h6 className={styles.separator}>
              <span>Lounge</span>
            </h6>
            <p>
              Jay Sella <span>V</span>
            </p>
          </div>
        </article>

        <article>
          <header>
            <h6>
              {moment().startOf('isoweek').add(3, 'days').format('dddd (M/D)')}
            </h6>
          </header>
          <div className={styles.inner}>
            <p>
              Malachi Robinson <span>II</span>
            </p>
            <p>
              Derek Williamson <span>A</span>
            </p>
            <h6 className={styles.separator}>
              <span>Lounge</span>
            </h6>
            <p>
              Jay Sella <span>V</span>
            </p>
          </div>
        </article>

        <article>
          <header>
            <h6>
              {moment().startOf('isoweek').add(4, 'days').format('dddd (M/D)')}
            </h6>
          </header>
          <div className={styles.inner}>
            <p>
              Malachi Robinson <span>II</span>
            </p>
            <p>
              Derek Williamson <span>A</span>
            </p>
            <h6 className={styles.separator}>
              <span>Lounge</span>
            </h6>
            <p>
              Jay Sella <span>V</span>
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}
export default LunchCurrent;
