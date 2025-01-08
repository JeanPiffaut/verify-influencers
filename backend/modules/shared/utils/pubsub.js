const { PubSub } = require('@google-cloud/pubsub');
const pubsub = new PubSub();

exports.publishMessage = async (topicName, data) => {
    const dataBuffer = Buffer.from(JSON.stringify(data));

    try {
        const messageId = await pubsub.topic(topicName).publishMessage({ data: dataBuffer });
        console.log(`Message ${messageId} published to topic ${topicName}.`);
        return messageId;
    } catch (error) {
        console.error(`Error publishing message to topic ${topicName}:`, error);
        throw error;
    }
};
