"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const { createNewProd } = require("./createNewProd");
const { deleteOldProd } = require("./deleteOldProd");
const { getddb } = require("./getddb");
const { postNewProd } = require("./postNewProd");

module.exports.iterateAndUpdate = async (item, sourceStage, destStage, excludeKeys) => {

  // ITERATE THROUGH ITEM ARRAY

  // for (let i = 0; i < item.length; i++) {
  //   item[i]
    const sourceParams = await {
      TableName: `params-${sourceStage}`,
      Key: {
        parameter_set: item[i],
      },
    };

    const destParams = await {
      TableName: `params-${destStage}`,
      Key: {
        parameter_set: item[i],
      },
    };

    // GET SOURCE AND PROD ITEMS

    const sourceItem = await getddb(sourceParams);
    console.log("sourceItem:", sourceItem);

    const destItem = await getddb(destParams);
    console.log("destItem:", destItem);

  // // CREATE NEW PROD ITEM
  const newItem = await createNewProd(sourceItem, destItem, excludeKeys);

  console.log("newItem: ", newItem);

  // //DELETE OLD PROD
  //   await deleteOldProd(destStage, item);

  // //POST NEW PROD ITEM TO DDB
  //   await postNewProd(destStage, item, newItem);

  };
