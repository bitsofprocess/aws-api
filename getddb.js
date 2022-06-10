"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies
const { createNewProd } = require("./createNewProd");
const updateddb = require("./postNewProd");

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// module.exports.getddb = async (params) => {
//     try {
//       const dataCallback = (error, result) => {

//         // if (error) {
//         // console.error('get error', error);
//         // reject(error);
//         // }

//         const ddbItem = result.Item;
//         return ddbItem;
//     }
//       dynamoDb.get(params, (error, result) => {

//           // if (error) {
//           // console.error('get error', error);
//           // reject(error);
//           // }

//           const ddbItem = result.Item;
//           return ddbItem;
//       });
//     } catch (error) {
//         console.log("Error Message: ", error)
//     }
//   }

  module.exports.getddb = (params) =>
    new Promise((resolve, reject) => {
      dynamoDb.get(params, (error, result) => {
        if (error) {
          console.error("get error", error);
          reject(error);
        }

        const ddbItem = result.Item;
        resolve(ddbItem);
      });
    });


// module.exports = getddb;
// let sourceItem = await dynamoDb.get(sourceParams, (error, result) => {

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
//     sourceItem = result.Item;
//     return sourceItem
// }

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
//             var destItem = result.Item;

// CREATE RECORD OF PROD FILE IN CONSOLE
// console.log(destItem);

// createNewProd(sourceItem, destItem);
//         })

// )}
