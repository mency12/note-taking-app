const AWS = require('aws-sdk');
const sns = new AWS.SNS();

exports.handler = async (event) => {
  const email = event.request.userAttributes.email;

  await sns.publish({
    TopicArn: process.env.TOPIC_ARN,
    Subject : 'New user sign‑up (confirm your subscription)',
    Message : `User ${email} has confirmed their account.\n\nYou can unsubscribe any time.`
  }).promise();

  // must return event unchanged so Cognito continues its flow
  return event;
};


