require('dotenv').config();
const fetch = require('node-fetch');

const responseHeaders = {
  'Access-Control-Allow-Origin': 'https://www.ourihc.com',
  'Access-Control-Allow-Headers': 'Content-Type',
};
const fetchHeaders = {
  'cache-control': 'no-cache',
  'content-type': 'application/json',
  'x-apikey': process.env.X_API_KEY,
};

/**
 * Fetch students from database based on provided query. If no query is specified, return all students]
 *
 * @method fetchStudents
 * @param query {string}
 * @param method {string}
 *
 * @return {object}
 */
async function fetchStudents(query, method) {
  const response = await fetch(`${process.env.API_URL}/students${query}`, {
    method,
    headers: fetchHeaders,
  });

  return response;
}

exports.handler = async (event) => {
  const path = event.path.replace(/api\/[^/]+/, '');
  const segments = path.split('/').filter((e) => e);

  switch (event.httpMethod) {
    case 'GET':
      /* GET /api/lunch */
      if (segments.length === 0) {
        try {
          const response = await fetchStudents('', 'get').then((res) =>
            res.json()
          );

          return {
            statusCode: 200,
            responseHeaders,
            body: JSON.stringify({
              meta: {
                totalStudents: response.length,
                totalStudentsByForm: {
                  a: response.filter(
                    (student) => student.form.toLowerCase() === 'a'
                  ).length,
                  i: response.filter(
                    (student) => student.form.toLowerCase() === 'i'
                  ).length,
                  ii: response.filter(
                    (student) => student.form.toLowerCase() === 'ii'
                  ).length,
                  iii: response.filter(
                    (student) => student.form.toLowerCase() === 'iii'
                  ).length,
                  iv: response.filter(
                    (student) => student.form.toLowerCase() === 'iv'
                  ).length,
                  v: response.filter(
                    (student) => student.form.toLowerCase() === 'v'
                  ).length,
                  vi: response.filter(
                    (student) => student.form.toLowerCase() === 'vi'
                  ).length,
                },
                totalStudentsByHouse: {
                  alban: response.filter(
                    (student) => student.house.toLowerCase() === 'alban'
                  ).length,
                  austin: response.filter(
                    (student) => student.house.toLowerCase() === 'austin'
                  ).length,
                  main: response.filter(
                    (student) => student.house.toLowerCase() === 'main'
                  ).length,
                  moore: response.filter(
                    (student) => student.house.toLowerCase() === 'moore'
                  ).length,
                },
              },
              data: response,
            }),
          };
        } catch (err) {
          return {
            statusCode: err.statusCode || 500,
            responseHeaders,
            body: JSON.stringify({
              error: err.message,
            }),
          };
        }
      }

      /* GET /api/lunch/[house] */
      if (segments.length === 1) {
        const house =
          segments[0].charAt(0).toUpperCase() + segments[0].substr(1);

        try {
          const response = await fetchStudents(
            `?q={"house": "${house}"}`,
            'get'
          ).then((res) => res.json());

          return {
            statusCode: 200,
            responseHeaders,
            body: JSON.stringify({
              meta: {
                totalStudents: response.length,
                totalStudentsByForm: {
                  a: response.filter(
                    (student) => student.form.toLowerCase() === 'a'
                  ).length,
                  i: response.filter(
                    (student) => student.form.toLowerCase() === 'i'
                  ).length,
                  ii: response.filter(
                    (student) => student.form.toLowerCase() === 'ii'
                  ).length,
                  iii: response.filter(
                    (student) => student.form.toLowerCase() === 'iii'
                  ).length,
                  iv: response.filter(
                    (student) => student.form.toLowerCase() === 'iv'
                  ).length,
                  v: response.filter(
                    (student) => student.form.toLowerCase() === 'v'
                  ).length,
                  vi: response.filter(
                    (student) => student.form.toLowerCase() === 'vi'
                  ).length,
                },
              },
              data: response,
            }),
          };
        } catch (err) {
          return {
            statusCode: err.statusCode || 500,
            body: JSON.stringify({
              responseHeaders,
              error: err.message,
            }),
          };
        }
      }

      return {
        statusCode: 500,
        responseHeaders,
        body: 'too many segments in GET request',
      };

    /* Fallthrough case */
    default:
      return {
        statusCode: 500,
        responseHeaders,
        body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE',
      };
  }
};