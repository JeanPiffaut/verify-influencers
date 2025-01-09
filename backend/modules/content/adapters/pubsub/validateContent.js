const {onMessagePublished} = require('firebase-functions/v2/pubsub');
const {publishMessage} = require('../../../shared/utils/pubsub');
const {validateContent} = require("../../service/contentValidationService");

exports.validateContent = onMessagePublished('validate-content', async (event) => {
    try {
        const data = JSON.parse(Buffer.from(event.data.message.data, 'base64').toString('utf-8'));
        const {influencerId} = data;

        const validContent = await validateContent(influencerId);
        console.log(`Valid content for influencer ${influencerId}:`, validContent);

        await publishMessage('complete-content-process', {influencerId});
    } catch (error) {
        console.error('Error validating content:', error.message);
    }
});
