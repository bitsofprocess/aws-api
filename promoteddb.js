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
    // const {sourceItem,destItem} = await getddb(params);
    // const sourceParams = {
    //     TableName: `params-${sourceStage}`,
    //     Key: {
    //         parameter_set: item
    //     }
    //   };
    // const destParams = {
    // TableName: `params-${destStage}`,
    // Key: {
    //     parameter_set: item
    // }
    //   };
    
    // // GET SOURCE AND PROD FILES

    // dynamoDb.get(sourceParams, (error, result) => {
  
    //     if (error) {
    //     console.error(error);
    //     callback(null, {
    //         statusCode: error.statusCode || 501,
    //         headers: { 'Content-Type': 'text/plain' },
    //         body: 'Couldn\'t fetch sourceParams.',
    //     });
    //     return;
    //     }

    //     const response = {
    //     statusCode: 200,
    //     body: JSON.stringify(result.Item),
    //     };
    //     callback(null, response);
    //     const sourceItem = result.Item;

    //     dynamoDb.get(destParams, (error, result) => {
    //             if (error) {
    //             console.error(error);
    //             callback(null, {
    //                 statusCode: error.statusCode || 501,
    //                 headers: { 'Content-Type': 'text/plain' },
    //                 body: 'Couldn\'t fetch destParams.',
    //             });
    //             return;
    //             }
        
    //             const response = {
    //             statusCode: 200,
    //             body: JSON.stringify(result.Item),
    //             };
    //             callback(null, response);
    //             const destItem = result.Item;

    //             // CREATE NEW PROD FILE

    //             let newItem = {
    //                 ...sourceItem
    //             }

    //             for (let [key, value] of Object.entries(newItem)) {
    //                 for (let i = 0; i < excludeKeys.length; i++) {
    //                     if (key === excludeKeys[i]) {
    //                     newItem[excludeKeys[i]] = destItem[excludeKeys[i]];
    //                     }
    //                 } 
    //               }


    //             console.log(newItem)
                
            // DELETE OLD FILE
        
        // const deleteOldProd = () => {

            const params = {
                TableName: `params-${destStage}`,
                Key: {
                parameter_set: item
                },
            };
            
                dynamoDb.delete(params, (error) => {
                    if (error) {
                    console.error(error);
                    callback(null, {
                        statusCode: error.statusCode || 501,
                        headers: { 'Content-Type': 'text/plain' },
                        body: 'Couldn\'t delete item.',
                    });
                    return;
                    }
                
                    const response = {
                    statusCode: 200,
                    body: JSON.stringify({}),
                    };
                    callback(null, response);
                    console.log(response);
                });
        // }
        
                // POST NEW PROD FILE TO DDB
                
                // const updateParams = {
                //     TableName: process.env.DYNAMODB_TABLE,
                //     Key: {
                //         parameter_set: item
                //     }
                //   };

                // dynamoDb.update(params, (error, result) => {
                //     if (error) {
                //       console.error(error);
                //       callback(null, {
                //         statusCode: error.statusCode || 501,
                //         headers: { 'Content-Type': 'text/plain' },
                //         body: 'Couldn\'t fetch the item.',
                //       });
                //       return;
                //     }
                
                //     const response = {
                //       statusCode: 200,
                //       body: JSON.stringify(result.Item),
                //     };
                //     callback(null, response);
                //   });
        }
//         )
//     })           
// };