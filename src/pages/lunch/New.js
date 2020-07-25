import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../lunch.module.sass';

const moment = require('moment');

const houses = ['all', 'alban', 'austin', 'main', 'moore'];
const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const loungeStatuses = ['open', 'closed'];
const daySorter = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
};

function capitalizeFirstLetter(string) {
  return `${string.charAt(0).toUpperCase()}${string.substr(1)}`;
}

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
  const [currentDays, setCurrentDays] = useState(days);
  const [currentLoungeStatus, setCurrentLoungeStatus] = useState('open');

  const [loadingStudents, setLoadingStudents] = useState(false);
  const [students, setStudents] = useState({});
  const [errors, setError] = useState({});

  console.log(errors);

  useEffect(() => {
    document.title = 'New Lunch Cleanup Assignments';
  }, []);

  function changeHouse(newHouse) {
    setCurrentHouse(newHouse);
  }

  function changeDays(newDay) {
    if (currentDays.includes(newDay)) {
      setCurrentDays([...currentDays.filter((e) => e !== newDay)]);
    } else {
      setCurrentDays([...currentDays, newDay]);
    }
  }

  function changeLoungeStatus(status) {
    setCurrentLoungeStatus(status);
  }

  async function loadStudents() {
    setLoadingStudents(true);

    await fetch(`/api/students/${currentHouse}`)
      .then((res) => res.json())
      .then((res) => {
        setStudents(res);
        console.log(res);
      })
      .catch((err) => {
        setError(err);
        // eslint-disable-next-line no-console
        console.error(err);
      });

    setLoadingStudents(false);
  }

  return (
    <div className={styles.wrapper}>
      <Link to="/lunch" className="button link primary has-icon_left">
        <span>&larr;</span> Back
      </Link>
      <br />
      <br />
      <h2>
        Lunch Cleanup
        {currentHouse && currentHouse !== 'all' && (
          <> &mdash; {capitalizeFirstLetter(currentHouse)}</>
        )}
        {currentDays && currentDays.length > 0 && (
          <>
            {' '}
            &mdash;{' '}
            {`${currentDays.length} ${
              currentDays.length === 1 ? 'Day' : 'Days'
            }`}
          </>
        )}
      </h2>

      <h4>Whose week is it?</h4>
      <div className="button-grid">
        {houses.map((house) => (
          <button
            key={house}
            type="button"
            className={`button primary round${
              house !== currentHouse ? ' hollow' : ''
            }`}
            data-current={house === currentHouse}
            onClick={() => changeHouse(house)}
          >
            {house}
            {house === currentHouse && <>&nbsp;&#10003;</>}
          </button>
        ))}
      </div>

      {currentHouse && (
        <>
          <h4>What day(s) do you need?</h4>
          <div className="button-grid">
            {days.map((day) => (
              <button
                key={day}
                type="button"
                className={`button primary round${
                  !currentDays.includes(day) ? ' hollow' : ''
                }`}
                data-current={currentDays.includes(day)}
                onClick={() => changeDays(day)}
              >
                {day}
                {currentDays.includes(day) && <>&nbsp;&#10003;</>}
              </button>
            ))}
          </div>
        </>
      )}

      {currentHouse && currentDays && currentDays.length > 0 && (
        <>
          <h4>Is the lounge open?</h4>
          <div className="button-grid">
            {loungeStatuses.map((status) => (
              <button
                key={status}
                type="button"
                className={`button primary round${
                  status !== currentLoungeStatus ? ' hollow' : ''
                }`}
                data-current={status === currentLoungeStatus}
                onClick={() => changeLoungeStatus(status)}
              >
                {status}
                {status === currentLoungeStatus && <>&nbsp;&#10003;</>}
              </button>
            ))}
          </div>
        </>
      )}

      {currentHouse && currentDays.length > 0 && currentLoungeStatus && (
        <>
          <h4>Ready to assign?</h4>
          <button
            type="button"
            className="button primary round shadow has-icon"
            onClick={() => loadStudents()}
          >
            Begin <span>&rarr;</span>
          </button>
        </>
      )}

      {loadingStudents && <h4>Loading, please wait...</h4>}

      {students && students.data && (
        <>
          <h4>
            &rarr; You're assigning lunch cleanup for{' '}
            {moment().startOf('isoweek').add(1, 'week').format('MMM Do')} &rarr;{' '}
            {moment()
              .startOf('isoweek')
              .add(1, 'week')
              .add(4, 'days')
              .format('MMM Do')}
          </h4>

          {currentDays
            .sort(function sortByDay(a, b) {
              const day1 = a.toLowerCase();
              const day2 = b.toLowerCase();
              return daySorter[day1] - daySorter[day2];
            })
            .map((day) => (
              <section key={day} className={styles.day}>
                <h4>
                  {capitalizeFirstLetter(day)} &rarr;{' '}
                  {moment()
                    .startOf('isoweek')
                    .add(1, 'week')
                    .add(days.indexOf(day), 'days')
                    .format('(M/D)')}
                </h4>
                <p>
                  <b>First lunch:</b>
                </p>
                <table>
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Form</td>
                    </tr>
                  </thead>
                  <tbody>
                    {students.data &&
                      students.data.map((student) => {
                        return (
                          student[day] &&
                          student[day].includes('1') && (
                            <tr
                              key={`${student.firstName.toLowerCase()}${student.lastName.toLowerCase()}${student.form.toLowerCase()}`}
                            >
                              <td>
                                {`${
                                  student.nickname
                                    ? student.nickname
                                    : student.firstName
                                } ${student.lastName}`}
                              </td>
                              <td>{student.form}</td>
                            </tr>
                          )
                        );
                      })}
                  </tbody>
                </table>

                <p>
                  <b>Second lunch:</b>
                </p>
                <table>
                  <thead>
                    <tr>
                      <td>Name</td>
                      <td>Form</td>
                    </tr>
                  </thead>
                  <tbody>
                    {students.data &&
                      students.data.map((student) => {
                        return (
                          student[day] &&
                          student[day].includes('2') && (
                            <tr
                              key={`${student.firstName.toLowerCase()}${student.lastName.toLowerCase()}${student.form.toLowerCase()}`}
                            >
                              <td>
                                {`${
                                  student.nickname
                                    ? student.nickname
                                    : student.firstName
                                } ${student.lastName}`}
                              </td>
                              <td>{student.form}</td>
                            </tr>
                          )
                        );
                      })}
                  </tbody>
                </table>
              </section>
            ))}
        </>
      )}

      {currentHouse && (
        <table>
          <tbody>
            {!!students.data &&
              students.data.map((student) => (
                <tr
                  key={`${student.firstName.toLowerCase()}${student.lastName.toLowerCase()}${student.form.toLowerCase()}`}
                  data-key={`${student.firstName.toLowerCase()}${student.lastName.toLowerCase()}${student.form.toLowerCase()}`}
                >
                  <td>
                    {student.nickname ? student.nickname : student.firstName}{' '}
                    {student.lastName}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default Lunch;
