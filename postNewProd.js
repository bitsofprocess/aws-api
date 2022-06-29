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


  await dynamoDb.put(newProdParams, function (err, data) {
    if (err) console.error(params.Key.parameter_set + "- Error Getting: " + error);
    else console.log("put executed");
  }).promise();

};
