module.exports.run = async (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify(event,null,4)
      };
      
    callback(null, response);
}