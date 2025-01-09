const {onMessagePublished} = require('firebase-functions/v2/pubsub');
const {publishMessage, decodePubSubMessage} = require('../../../shared/utils/pubsub');
const {validateContent} = require("../../service/contentValidationService");

exports.validateContent = onMessagePublished('validate-content', async (event) => {
    try {
        const data = decodePubSubMessage(event);
        const {influencerId} = data;

        const validContent = await validateContent(influencerId);
        console.log(`Valid content for influencer ${influencerId}:`, validContent);

        await publishMessage('complete-content-process', {influencerId});
    } catch (error) {
        console.error('Error validating content:', error.message);
    }
});
