"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.deleteOldProd = async (destStage, item) => {

  const deleteParams = {
    TableName: `params-${destStage}`,
    Key: {
      parameter_set: item,
    },
  };
  
  await dynamoDb.delete(deleteParams, function(err, data) {
    if (err) console.log(err);
    else console.log(data);
  }).promise();

};
