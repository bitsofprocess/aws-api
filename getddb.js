'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();


const getddb = (sourceParams, destParams) => {

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

        const sourceItem = result.Item;
        console.log(sourceItem);
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
    
            const destItem = result.Item;
            console.log(destItem);
        });
}

module.exports = getddb;