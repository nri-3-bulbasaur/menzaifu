// /* Amplify Params - DO NOT EDIT
// 	ENV
// 	REGION
// Amplify Params - DO NOT EDIT *//**
//  * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
//  */
// // eslint-disable-next-line no-undef
// exports.handler = async (event) => {
//   console.log(`EVENT: ${JSON.stringify(event)}`);
//   return {
//     statusCode: 200,
//     //  Uncomment below to enable CORS requests
//     //  headers: {
//     //      "Access-Control-Allow-Origin": "*",
//     //      "Access-Control-Allow-Headers": "*"
//     //  },
//     body: JSON.stringify('Hello from Lambda!'),
//   };
// };

import { default as fetch, Request } from 'node-fetch';

// eslint-disable-next-line no-undef
const GRAPHQL_ENDPOINT = process.env.API_adduser_GRAPHQLAPIENDPOINTOUTPUT;
// eslint-disable-next-line no-undef
const GRAPHQL_API_KEY = process.env.API_adduser_GRAPHQLAPIKEYOUTPUT;

export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
      id
      userId
      height
      weight
      age
      zaifuPoint
      createdAt
      updatedAt
    }
  }
`;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event, callback) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  console.log(GRAPHQL_ENDPOINT);

  const data = JSON.stringify(event);

  const variables = {
    input: {
      name: data.userName,
    },
  };

  /** @type {import('node-fetch').RequestInit} */
  const options = {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
    },
    body: JSON.stringify({ createUsers, variables }),
  };

  const request = new Request(GRAPHQL_ENDPOINT, options);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors) statusCode = 400;
  } catch (error) {
    // eslint-disable-next-line no-unused-vars
    statusCode = 400;
    body = {
      errors: [
        {
          status: response.status,
          message: error.message,
          stack: error.stack,
        },
      ],
    };
  }
  // Return to Amazon Cognito
  callback(null, event);
};
