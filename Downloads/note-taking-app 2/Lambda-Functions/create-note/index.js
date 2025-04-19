const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const awsS3 = new AWS.S3();
const awsDynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  console.log("Create File API !! ");
  const fileId = uuidv4(); 
  const s3Input = {
    Bucket: "cloud-term-project-s3-bucket-12345678",
    Key: `${fileId}.html`,
    Body: "",
    ContentType: "text/html",
  };

  // Add file to S3
  await awsS3.putObject(s3Input).promise();

  // Add entry to DynamoDB
  const dbParams = {
    TableName: "cloud-term-project-DB-1",
    Item: { fileId: fileId },
  };
  await awsDynamoDB.put(dbParams).promise();

  await sns.publish({
    TopicArn: process.env.TOPIC_ARN,
    Subject : 'New note created',
    Message : `A new note with ID ${fileId} was just created.`
  }).promise();

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", 
      "Content-Type": "application/json"
  },
  body: JSON.stringify({ fileId: fileId })
  };
};
