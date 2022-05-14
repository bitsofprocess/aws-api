'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const updateddb = require('./updateddb');

const dynamoDb = new AWS.DynamoDB.DocumentClient();


const getddb = (sourceParams, destParams) => {
    let sourceItem 
    let destItem 

    dynamoDb.get(sourceParams, (error, result) => {
    // handle potential errors
        if (error) {
        console.error(error);
        callback(null, {
            statusCode: error.statusCode || 501,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Couldn\'t fetch the sourceParams.',
        });
        return;
        }

        // create a response
        const response = {
        statusCode: 200,
        body: JSON.stringify(result.Item.app),
        };
        // callback(null, response);

        sourceItem = result.Item;
    });

    dynamoDb.get(destParams, (error, result) => {
        // handle potential errors
            if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Couldn\'t fetch the sourceParams.',
            });
            return;
            }
    
            // create a response
            const response = {
            statusCode: 200,
            body: JSON.stringify(result.Item.app),
            };
            // callback(null, response);
    
            destItem = result.Item;
        });
    
    console.log(sourceItem);
    console.log(destItem);
    updateddb(sourceItem, destItem);
}

module.exports = getddb;