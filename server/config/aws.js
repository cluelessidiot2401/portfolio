var aws = require("aws-sdk");

const configureAws = () => {
  // Configure aws with your accessKeyId and your secretAccessKey
  aws.config.update({
    region: "us-east-1", // Put your aws region here
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
  });
};

module.exports = configureAws;
