"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies
const { deleteOldProd } = require("./deleteOldProd");
const { postNewProd } = require("./postNewProd");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createNewProd = async (sourceItem, destItem, excludeKeys) => {
  let newItem = await {
    ...sourceItem,
  };

  for (let i = 0; i < excludeKeys.length; i++) {
    eval("newItem." + excludeKeys[i] + "=" + "destItem." + excludeKeys[i]);
  }

    return newItem;
  
};
