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

  try {
    const result = await docClient.put(params).promise();
    console.log(result);
  } catch (err) {
    console.error(err);
  }

  callback(null, event);
};
