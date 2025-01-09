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

exports.decodePubSubMessage = (event) => {
    try {
        const rawData = event.data.message.data;
        return JSON.parse(Buffer.from(rawData, 'base64').toString('utf-8'));
    } catch (error) {
        console.error('Error decoding Pub/Sub message:', error.message);
        throw new Error('Invalid Pub/Sub message format.');
    }
};
