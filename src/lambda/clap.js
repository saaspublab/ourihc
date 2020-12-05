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
};

/**
 * Fetch all students from database.
 *
 * @method putClap
 * @param query {string}
 * @param method {string}
 *
 * @return {object}
 */
async function putClap(query, method, body) {
  const response = await fetch(`${process.env.API_URL}/talent${query}`, {
    method,
    headers: fetchHeaders,
    body: JSON.stringify(body),
  });

  return response;
}

exports.handler = async (event) => {
  const path = event.path.replace(/api\/[^/]+/, '');
  const segments = path.split('/').filter((e) => e);

  switch (event.httpMethod) {
    case 'GET':
      /* PUT /api/talent/[id] */
      if (segments.length === 2) {
        const id = segments[0];
        const claps = segments[1];

        try {
          const response = await putClap(`/${id}`, 'put', {
            claps,
          }).then((res) => res.json());

          return {
            statusCode: 200,
            headers: responseHeaders,
            body: JSON.stringify({
              success: true,
              talent: response,
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
          error: 'Bad request: too few or too many segments in GET request',
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
