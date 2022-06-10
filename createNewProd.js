'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const { deleteOldProd } = require('./deleteOldProd');
const { postNewProd } = require('./postNewProd');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createNewProd = async (sourceItem, destItem, excludeKeys) => {
    
    let newItem = await {
        ...sourceItem
    }
    // justin's spaghetti
    // for (let i=0;i<excludeKeys.length;i++) {
    //     newItem.`${excludeKeys[i]}` = destItem.excludeKeys[i];
    // }
    //
    for (let [key, value] of Object.entries(newItem)) {
        for (let i = 0; i < excludeKeys.length; i++) {
            if (key === excludeKeys[i]) {
            newItem[excludeKeys[i]] = destItem[excludeKeys[i]];
            console.log("Replacing: ",key);
            }
        } 
    } 
    console.log("createNewProd: ", newItem);
    return newItem;
}