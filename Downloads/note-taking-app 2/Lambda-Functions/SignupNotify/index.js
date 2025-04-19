exports.handler = (event, context, callback) => {
  // Log the event
  console.log('PreSignUp event:', JSON.stringify(event, null, 2));
  
  // Auto confirm the user
  event.response.autoConfirmUser = true;
  
  // Set the email as verified if it exists
  if (event.request.userAttributes.hasOwnProperty("email")) {
    event.response.autoVerifyEmail = true;
  }
  
  // Return to Amazon Cognito with the updated event
  callback(null, event);
};