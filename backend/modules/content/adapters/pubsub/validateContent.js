const {onMessagePublished} = require('firebase-functions/v2/pubsub');
const {publishMessage, decodePubSubMessage} = require('../../../shared/utils/pubsub');
const {validateContent} = require("../../service/contentValidationService");

exports.validateContent = onMessagePublished('validate-content', async (event) => {
    try {
        const {id} = decodePubSubMessage(event);

        const validContent = await validateContent(id);
        console.log(`Valid content for influencer ${id}:`, validContent);

        await publishMessage('score-influencer', {id});
    } catch (error) {
        console.error('Error validating content:', error.message);
    }
});
