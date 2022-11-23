<<<<<<< HEAD
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
// eslint-disable-next-line no-undef
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify('Hello from Lambda!'),
  };
=======
// eslint-disable-next-line no-undef
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

// eslint-disable-next-line no-undef
exports.handler = async (event, context, callback) => {
  const now = new Date();
  var params = {
    TableName: 'Users-zlyspywzt5ahpof36ymjggmtxe-staging',
    Item: {
      id: event.userName,
      userId: event.userName,
      height: '170',
      weight: '70',
      age: '30',
      zaifuPoint: '100',
      __typename: 'Users',
      updatedAt: now.toISOString(),
      createdAt: now.toISOString(),
    },
  };
  // eslint-disable-next-line no-unused-vars
  try {
    const result = await docClient.put(params).promise();
    console.log(result);
  } catch (err) {
    console.error(err);
  }

  callback(null, event);
>>>>>>> f35f1c9bc745ab1ea8bbe95687cc9c5f797ec198
};
