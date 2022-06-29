"use strict";

const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies
const { createNewProd } = require("./createNewProd");
const updateddb = require("./postNewProd");

const dynamoDb = new AWS.DynamoDB.DocumentClient();


  module.exports.getddb = (params) =>
    new Promise((resolve, reject) => {
      dynamoDb.get(params, (error, result) => {
        if (error) {
          console.error(params.Key.parameter_set + "- Error Getting: " + error);
          reject(error);
        }

        const ddbItem = result.Item;
        resolve(ddbItem);
      });
    });



