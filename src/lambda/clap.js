require('dotenv').config();

const responseHeaders = {
  'Access-Control-Allow-Origin': process.env.CORS_URL,
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
};

exports.handler = async () => {
  return {
    statusCode: 403,
    headers: responseHeaders,
    body: JSON.stringify({
      success: false,
      error: 'Access forbidden.',
    }),
  };
};

// require('dotenv').config();
// const fetch = require('node-fetch');

// const responseHeaders = {
//   'Access-Control-Allow-Origin': process.env.CORS_URL,
//   'Access-Control-Allow-Headers': 'Content-Type',
//   'Access-Control-Allow-Methods': 'GET, OPTIONS',
// };
// const fetchHeaders = {
//   'cache-control': 'no-cache',
//   'content-type': 'application/json',
//   'x-apikey': process.env.X_API_KEY,
// };

// /**
//  * Update talent claps in database.
//  *
//  * @method putClap
//  * @param query {string}
//  * @param method {string}
//  *
//  * @return {object}
//  */
// async function putClap(query, method, body) {
//   const response = await fetch(`${process.env.API_URL}/talent${query}`, {
//     method,
//     headers: fetchHeaders,
//     body: JSON.stringify(body),
//   });

//   return response;
// }

// exports.handler = async (event) => {
//   const path = event.path.replace(/api\/[^/]+/, '');
//   const segments = path.split('/').filter((e) => e);

//   switch (event.httpMethod) {
//     case 'GET':
//       /* PUT /api/talent/[id] */
//       if (segments.length === 1) {
//         const id = segments[0];

//         try {
//           const response = await putClap(`/${id}`, 'patch', {
//             $inc: { claps: 1 },
//           }).then((res) => res.json());

//           return {
//             statusCode: 200,
//             headers: responseHeaders,
//             body: JSON.stringify({
//               success: true,
//               talent: response,
//             }),
//           };
//         } catch (err) {
//           return {
//             statusCode: err.statusCode || 500,
//             headers: responseHeaders,
//             body: JSON.stringify({
//               success: false,
//               error: err.message,
//             }),
//           };
//         }
//       }

//       return {
//         statusCode: 400,
//         headers: responseHeaders,
//         body: JSON.stringify({
//           success: false,
//           error: 'Bad request: your request should have only 1 segment',
//         }),
//       };

//     case 'OPTIONS':
//       return {
//         statusCode: 204,
//         headers: responseHeaders,
//       };

//     /* Fallthrough case */
//     default:
//       return {
//         statusCode: 405,
//         headers: responseHeaders,
//         body: JSON.stringify({
//           success: false,
//           error: 'HTTP method not allowed; must be one of GET/OPTIONS',
//         }),
//       };
//   }
// };
