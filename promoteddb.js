'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const getddb = require('./getddb');
const updateddb = require('./updateddb');

const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.run = (event, context, callback) => {
    const sourceStage = event.pathParameters.sourceStage;
    const destStage = event.pathParameters.destStage;
    const item = "common";
    const excludeKeys = [
        "game_api_key",
        "min_version"
    ];
    console.log(sourceStage);
    console.log(destStage);
    const sourceParams = {
        TableName: `params-${sourceStage}`,
        Key: {
            parameter_set: item
        }
      };
    const destParams = {
    TableName: `params-${destStage}`,
    Key: {
        parameter_set: item
    }
      };
    
    getddb(sourceParams, destParams);

    updateddb(sourceItem, destItem);
//   fetch all todos from the database
    // dynamoDb.get(sourceparams, (error, result) => {
    // // handle potential errors
    //     if (error) {
    //     console.error(error);
    //     callback(null, {
    //         statusCode: error.statusCode || 501,
    //         headers: { 'Content-Type': 'text/plain' },
    //         body: 'Couldn\'t fetch the item.',
    //     });
    //     return;
    //     }

    //     // create a response
    //     const response = {
    //     statusCode: 200,
    //     body: JSON.stringify(result.Item.app),
    //     };
    //     // callback(null, response);
    //     const sourceItem = result.Item;

    //     dynamoDb.get(destparams, (error, result) => {
    //         // handle potential errors
    //         if (error) {
    //         console.error(error);
    //         callback(null, {
    //             statusCode: error.statusCode || 501,
    //             headers: { 'Content-Type': 'text/plain' },
    //             body: 'Couldn\'t fetch the item.',
    //         });
    //         return;
    //         }

    //         // create a response
    //         const response = {
    //         statusCode: 200,
    //         body: JSON.stringify(result.Item.app),
    //         };
    //         // callback(null, response);
    //         const destItem = result.Item;
    //         const bothItems ={
    //             sourceItem: sourceItem,
    //             destItem: destItem
    //         };
    //         const res = {
    //             statusCode: 200,
    //             body: JSON.stringify(bothItems)
    //         }
    //         callback(null, res);
    //         var newItem = sourceItem;
    //         newItem.game_api_key = destItem.game_api_key;
    //         // newItem.min_version = destItem.min_version;
    //     });
    //         return newItem;
    // });
};