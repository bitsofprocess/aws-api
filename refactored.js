"use strict";

// const _ = require("lodash");

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies
const { createNewProd } = require("./createNewProd");
const { deleteOldProd } = require("./deleteOldProd");
const { getddb } = require("./getddb");
const { iterateAndUpdate } = require("./iterateAndUpdate");
const { postNewProd } = require("./postNewProd");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.run = async (event, context, callback) => {
  const sourceStage = event.pathParameters.sourceStage;
  const destStage = event.pathParameters.destStage;

  const item = [
    "CT",
    "DW20",
    "SK",
    "VB",
    "OCH",
    "CHPT",
    "onboarding",
    "games",
    "BNG",
    "GAH",
    "FLUS",
    "SBS",
    "audio",
    "TW",
    "common",
    "TOT",
  ];

  const excludeKeys = {
    common: [
      "app.screens_v2.login.logo_url",
      "app.screens_v2.menu.logo_url",
      "app.screens_v2.signup.logo_url",
      "game_api_stage",
      "min_version",
      "zoom",
      "min_version",
      "game_api",
      "parameters_api_key",
      "zoom_client_id",
      "chargebee_url",
    ],
    games: ["game_library.game_categories", "game_library.hero"],
  };

  // iterateAndUpdate(item, sourceStage, destStage, excludeKeys);
  for (let i = 0; i < item.length; i++) {
    item[i];

    const sourceParams = {
      TableName: `params-${sourceStage}`,
      Key: {
        parameter_set: item[i],
      },
    };

    const destParams = {
      TableName: `params-${destStage}`,
      Key: {
        parameter_set: item[i],
      },
    };

    const sourceItem = await getddb(sourceParams);
    const destItem = await getddb(destParams);

    // console.log(item[i]) // prints each item
    // console.log('item excludeKeys for:', excludeKeys[item[i]]) // 'undefined' for all excet 'games' and 'common

    if (excludeKeys[item[i]]) {
      const newItem = await createNewProd(sourceItem, destItem, excludeKeys[item[i]]);
      (console.log(JSON.stringify(newItem, null, 3)))
      await deleteOldProd(destStage, item[i]);
      await postNewProd(destStage, item[i], newItem);
    
    } else {
      // const newItem = await sourceItem;
      // console.log(`sourceItem of ${item[i]} copied`)
      console.log(`sourceItem for ${item[i]} to be copied`)
    }

    // if (_.isEqual(newItem, destItem)) {
    //   console.log(item[i] + " matches, no update needed.");
    // } else {
    //   await deleteOldProd(destStage, item[i]);
    //   await postNewProd(destStage, item[i], newItem);
    // }
  }
  
};
