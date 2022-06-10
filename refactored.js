"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies
const { createNewProd } = require("./createNewProd");
const { deleteOldProd } = require("./deleteOldProd");
const { getddb } = require("./getddb");
const { postNewProd } = require("./postNewProd");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.run = async (event, context, callback) => {
  const sourceStage = event.pathParameters.sourceStage;
  const destStage = event.pathParameters.destStage;
  
  const item = "common";
  const excludeKeys = [
    "app.screens_v2.login.logo_url",
    "app.screens_v2.menu.logo_url",
    "app.screens_v2.signup.logo_url",
    "game_api_stage",
    "min_version",
    "zoom",
    "min_version",
    "game_api",
    "parameters_api_key",
    "zoom_client_id"
  ];

  const sourceParams = {
    TableName: `params-${sourceStage}`,
    Key: {
      parameter_set: item,
    },
  };

  const destParams = {
    TableName: `params-${destStage}`,
    Key: {
      parameter_set: item,
    },
  };

  // GET SOURCE AND PROD ITEMS
  const sourceItem = await getddb(sourceParams);

  console.log('sourceItem:', sourceItem);

  const destItem = await getddb(destParams);

  console.log("destItem:", destItem);

// CREATE NEW PROD ITEM
  const newItem = await createNewProd(sourceItem, destItem, excludeKeys);

  console.log("refactored - newItem: ", newItem)

//DELETE OLD PROD
  await deleteOldProd(destStage, item);

//POST NEW PROD ITEM TO DDB
  await postNewProd(destStage, item, newItem);

};
