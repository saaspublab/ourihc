import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './lunch.module.sass';

const moment = require('moment');

const houses = ['all', 'alban', 'austin', 'main', 'moore'];

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

function Lunch() {
  const [currentHouse, setCurrentHouse] = useState('');
  const [errors, setError] = useState({});
  const [students, setStudents] = useState({});
  const [assignments, setAssignments] = useState({});

  function fetchAssignments(q) {
    let query = q;
    if (!query) {
      query = '';
    }
    fetch(`/api/assignments/${query}`)
      .then((res) => res.json())
      .then((res) => {
        setAssignments(res);
        console.log(res);
      })
      .catch((err) => {
        setError(err);
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }

  useEffect(() => {
    document.title = 'Lunch Cleanup Dashboard';
    // fetchAssignments();
  }, []);

  function changeHouse(newHouse) {
    setCurrentHouse(newHouse);

    fetch(`/api/students/${currentHouse}`)
      .then((res) => res.json())
      .then((res) => {
        setStudents(res);
      })
      .catch((err) => {
        setError(err);
        // eslint-disable-next-line no-console
        console.error(err);
      });
  }

  return (
    <div className={styles.wrapper}>
      <h2>Lunch Cleanup</h2>
      <h4>Today is {moment().format('dddd, MMMM Do')}</h4>
      <div className={styles.actions}>
        <Link to="/lunch/new" className="button primary round has-icon">
          Create New <span>&rarr;</span>
        </Link>
        <Link to="/lunch/current" className="button primary round has-icon">
          This Week's Assignments <span>&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
export default Lunch;
