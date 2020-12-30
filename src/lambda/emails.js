require('dotenv').config();
const fetch = require('node-fetch');

const responseHeaders = {
  'Access-Control-Allow-Origin': process.env.CORS_URL,
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};
const fetchHeaders = {
  'cache-control': 'no-cache',
  'content-type': 'application/json',
  'x-apikey': process.env.X_API_KEY,
  'Cache-Control': 'max-age=300,immutable',
};

/**
 * Fetch all people (students + faculty) from database.
 *
 * @method fetchEmails
 * @param query {string}
 * @param method {string}
 *
 * @return {object}
 */
async function fetchEmails(query, method) {
  const response = await fetch(`${process.env.API_URL}/people${query}`, {
    method,
    headers: fetchHeaders,
  });

  // eslint-disable-next-line no-console
  console.log('[/api/emails] Fetched from remote.');

  return response;
}

exports.handler = async (event) => {
  const path = event.path.replace(/api\/[^/]+/, '');
  const segments = path.split('/').filter((e) => e);

  const countOccurrences = (arr, role) =>
    arr.reduce((a, r) => {
      return r.role === role ? a + 1 : a;
    }, 0);

  switch (event.httpMethod) {
    case 'GET':
      /* GET /api/emails */
      if (segments.length === 0) {
        try {
          const response = await fetchEmails('', 'get').then((res) =>
            res.json()
          );

          return {
            statusCode: 200,
            headers: responseHeaders,
            body: JSON.stringify({
              success: true,
              meta: {
                totalStudents: countOccurrences(response, 'student'),
                totalFaculty: countOccurrences(response, 'faculty'),
                totalPeople: response.length,
              },
              data: response,
            }),
          };
        } catch (err) {
          return {
            statusCode: err.statusCode || 500,
            headers: responseHeaders,
            body: JSON.stringify({
              success: false,
              error: err.message,
            }),
          };
        }
      }

      return {
        statusCode: 400,
        headers: responseHeaders,
        body: JSON.stringify({
          success: false,
          error: 'Bad request: too many segments in GET request',
        }),
      };

    case 'OPTIONS':
      return {
        statusCode: 204,
        headers: responseHeaders,
      };

    /* Fallthrough case */
    default:
      return {
        statusCode: 405,
        headers: responseHeaders,
        body: JSON.stringify({
          success: false,
          error: 'HTTP method not allowed; must be one of GET/OPTIONS',
        }),
      };
  }
};
