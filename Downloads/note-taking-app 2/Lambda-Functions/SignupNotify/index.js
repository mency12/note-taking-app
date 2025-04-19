const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const { fileId, htmlContentType } = event;

  console.log("FileID : ", fileId);

  try {
    
    const s3Input = {
      Bucket: "cloud-term-project-s3-bucket-12345678",
      Key: `${fileId}.html`,
      Body: htmlContentType,
      ContentType: "text/html", 
    };

    await s3.putObject(s3Input).promise();
    return {
      statusCode: 200,
      message: "File saved !!",
      headers: {
        "Access-Control-Allow-Origin": "*", // Adjust as needed for your use case
        "Content-Type": "application/json"
    },
    };
  } catch (error) {
    console.error("Error in saving file: ", error);
    return {
      statusCode: 500,
      error: "Error in saving the file",
    };
  }
};
