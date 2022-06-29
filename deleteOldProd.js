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

  await dynamoDb
    .delete(deleteParams, function (err, data) {
      if (err) {
        console.error(params.Key.parameter_set + "- Error Getting: " + error);
      } else {
        console.log(`${item} deleted from prod`);
      }
    })
    .promise();
};
