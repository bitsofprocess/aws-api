'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.run = (event, context, callback) => {
    const sourceStage = event.pathParameters.sourceStage;
    const destStage = event.pathParameters.destStage;
    const item = "common";
    const excludeKeys = [
        "game_api_stage",
        "min_version",
        "zoom",
        "min_version",
        "game_api",
        "parameters_api_key"
    ];
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
    
    
    // getddb(sourceParams, destParams);

    dynamoDb.get(sourceParams, (error, result) => {
    // handle potential errors
        if (error) {
        console.error(error);
        callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t fetch sourceParams.',
        });
        return;
        }

        // create a response
        const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item),
        };
        // callback(null, response);
        const sourceItem = result.Item;
        console.log(sourceItem)

        dynamoDb.get(destParams, (error, result) => {
            // handle potential errors
                if (error) {
                console.error(error);
                callback(null, {
                    statusCode: error.statusCode || 501,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Couldn\'t fetch destParams.',
                });
                return;
                }
        
                // create a response
                const response = {
                statusCode: 200,
                body: JSON.stringify(result.Item),
                };
                // callback(null, response);
                const destItem = result.Item;

                // console.log(sourceItem);
                // console.log(destItem);
                

                // updateddb function to be added here 
                

                let newItem = {
                    ...sourceItem
                }

                // console.log(newItem)

                for (let [key, value] of Object.entries(newItem)) {
                    for (let i = 0; i < excludeKeys.length; i++) {
                        if (key === excludeKeys[i]) {
                        newItem[excludeKeys[i]] = destItem[excludeKeys[i]];
                        }
                    } 
                  }


                // console.log(newItem)
                
                  // console.log to keep record
                // console.log(destItem);
                
                //add logic to replace excludeKeys (iterate through excludeKeys array and overwrite sourceItem keys)
            })

            // delete destItem
            // create function
    })
                
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