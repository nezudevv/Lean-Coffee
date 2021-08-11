import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

AWS.config.update({
  region: "us-east-2",
  endpoint: "dynamodb.us-east-2.amazonaws.com",
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Lean-Coffee";

const getTopics = async () => {
  const params = {
    TableName: TABLE_NAME,
  };
  const topics = await dynamoClient.scan(params).promise();
  console.log(topics);
  return topics;
};

const addOrUpdateTopic = async topic => {
  const params = {
    TableName: TABLE_NAME,
    Item: topic,
  };
  return await dynamoClient.put(params).promise();
};

const deleteTopic = async id => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id,
    },
  };
  return await dynamoClient.delete(params).promise();
};

export { getTopics, addOrUpdateTopic, deleteTopic };
