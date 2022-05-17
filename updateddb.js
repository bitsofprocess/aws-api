'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// const updateddb = (sourceItem, destItem) => {
// //   const timestamp = new Date().getTime();
// //   const data = JSON.parse(event.body);
// //   if (typeof data.text !== 'string') {
// //     console.error('Validation Failed');
// //     callback(null, {
// //       statusCode: 400,
// //       headers: { 'Content-Type': 'text/plain' },
// //       body: 'Couldn\'t create the todo item.',
// //     });
// //     return;
//   }

//   // const newItem = {
//   //   ...sourceItem, 
//   //   game_api_key: destItem.game_api_key
//   // };

//   // write the todo to the database
//   dynamoDb.put(newItem, (error) => {
//     // handle potential errors
//     if (error) {
//       console.error(error);
//       callback(null, {
//         statusCode: error.statusCode || 501,
//         headers: { 'Content-Type': 'text/plain' },
//         body: 'Couldn\'t create newItem',
//       });
//       return;
//     }

//     // create a response
//     const response = {
//       statusCode: 200,
//       body: JSON.stringify(newItem),
//     };
//     callback(null, response);
//   });

 // START HERE
//   let newItem = {
//     ...sourceItem
// }

// console.log(newItem)

  // for (let [key, value] of Object.entries(newItem)) {
  //     for (let i = 0; i < excludeKeys.length; i++) {
  //         if (key === excludeKeys[i]) {
  //         newItem[excludeKeys[i]] = destItem[excludeKeys[i]];
  //         }
  //     } 
  //   }
  
  const updateddb = (newItem, destItem) => {
    for (let [key, value] of Object.entries(newItem)) {
      for (let i = 0; i < excludeKeys.length; i++) {
          if (key === excludeKeys[i]) {
          newItem[excludeKeys[i]] = destItem[excludeKeys[i]];
          }
      } 
    }
  }


module.exports = updateddb;