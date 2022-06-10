"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.postNewProd = async (destStage, item, newItem) => {
  const newProdParams = await {
    TableName: `params-${destStage}`,
    Item: {
      parameter_set: item,
      ...newItem,
    },
  };

  console.log("postNewProd - newProdParams: ", newProdParams)

  await dynamoDb.put(newProdParams, function (err, data) {
    if (err) console.log(err);
    else console.log("put executed");
  }).promise();

  // await dynamoDb.put(newProdParams, (error) => {
  //   // handle potential errors
  //   if (error) {
  //     console.error(error);
  //     callback(null, {
  //       statusCode: error.statusCode || 501,
  //       headers: { 'Content-Type': 'text/plain' },
  //       body: 'Couldn\'t create new prod table.',
  //     });
  //     return;
  //   }

  //   // create a response
  //   const response = {
  //     statusCode: 200,
  //     body: JSON.stringify(newProdParams.Item),
  //   };
  //   callback(null, response);
  // }).promise();
};
