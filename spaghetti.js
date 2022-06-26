"use strict";

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

  // const item = "common";
  // const excludeKeys = [
  //   "app.screens_v2.login.logo_url",
  //   "app.screens_v2.menu.logo_url",
  //   "app.screens_v2.signup.logo_url",
  //   "game_api_stage",
  //   "min_version",
  //   "zoom",
  //   "min_version",
  //   "game_api",
  //   "parameters_api_key",
  //   "zoom_client_id",
  // ];

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

  // const sourceParams = {
  //   TableName: `params-${sourceStage}`,
  //   Key: {
  //     parameter_set: item,
  //   },
  // };

  // const destParams = {
  //   TableName: `params-${destStage}`,
  //   Key: {
  //     parameter_set: item,
  //   },
  // };

  // const commonExcludeKeys = [
  //   "app.screens_v2.login.logo_url",
  //   "app.screens_v2.menu.logo_url",
  //   "app.screens_v2.signup.logo_url",
  //   "game_api_stage",
  //   "min_version",
  //   "zoom",
  //   "min_version",
  //   "game_api",
  //   "parameters_api_key",
  //   "zoom_client_id",
  //   "chargebee_url",
  // ];

  // const gameExcludeKeys = ["game_library.game_categories", "game_library.hero"];

  // justin penne pasta
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
      "chargebee_url"
    ],
    games: [
      "game_library.game_categories",
      "game_library.hero"
    ]
  }

//////////////////

if (excludeKeys[item[i]]) {
  // then do the exclude key actions, otherwise do nothing.
}

////////
  for (let i = 0; i < item.length; i++) {
    let excludeKeys;

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

    if (item[i] !== "common") {
      excludeKeys = gameExcludeKeys;
      //   console.log(`item: ${item[i]}`, `excludeKeys: ${excludeKeys}`);
    } else {
      excludeKeys = commonExcludeKeys;
      //   console.log(`item: ${item[i]}`, `excludeKeys: ${excludeKeys}`);
    }

///////////////

    // GET SOURCE AND PROD ITEMS
    const sourceItem = await getddb(sourceParams);

    console.log("sourceItem:", sourceItem);

    const destItem = await getddb(destParams);

    console.log("destItem:", destItem);

    // CREATE NEW PROD ITEM
    const newItem = await createNewProd(sourceItem, destItem, excludeKeys);

    console.log("refactored - newItem: ", newItem);

    //DELETE OLD PROD
    await deleteOldProd(destStage, item);

    //POST NEW PROD ITEM TO DDB
    await postNewProd(destStage, item, newItem);
  }

  // for (let i = 0; i < item.length; i++) {
  //   const sourceParams = {
  //     TableName: `params-${sourceStage}`,
  //     Key: {
  //       parameter_set: item[i],
  //     },
  //   };

  //   const destParams = {
  //     TableName: `params-${destStage}`,
  //     Key: {
  //       parameter_set: item[i],
  //     },
  //   };
  // if (item === "common") {
  //   let excludeKeys = [
  //     "app.screens_v2.login.logo_url",
  //     "app.screens_v2.menu.logo_url",
  //     "app.screens_v2.signup.logo_url",
  //     "game_api_stage",
  //     "min_version",
  //     "zoom",
  //     "min_version",
  //     "game_api",
  //     "parameters_api_key",
  //     "zoom_client_id",
  //     "chargebee_url"
  //   ];
  // } else {
  //   excludeKeys = [
  //     "game_library.game_categories",
  //     "game_library.hero"
  //   ]
  // } console.log(`sourceParams: ${sourceParams}`, `destParams: ${destParams}`, `excludeKeys: ${excludeKeys}`)

  // }

  // GET SOURCE AND PROD ITEMS
  // const sourceItem = await getddb(sourceParams);

  // console.log("sourceItem:", sourceItem);

  // const destItem = await getddb(destParams);

  // console.log("destItem:", destItem);

  // // CREATE NEW PROD ITEM
  // const newItem = await createNewProd(sourceItem, destItem, excludeKeys);

  // console.log("refactored - newItem: ", newItem);

  // //DELETE OLD PROD
  //   await deleteOldProd(destStage, item);

  // //POST NEW PROD ITEM TO DDB
  //   await postNewProd(destStage, item, newItem);
};