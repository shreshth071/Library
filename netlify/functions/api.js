const serverless = require('serverless-http');
const app = require('../../index');
const connection = require('../../Connection');

const handler = serverless(app);

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connection();
  return await handler(event, context);
};

