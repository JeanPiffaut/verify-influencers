const { onMessagePublished } = require('firebase-functions/v2/pubsub');
const { updateStatus } = require('../../repository/contentRepository');
const {decodePubSubMessage} = require("../../../shared/utils/pubsub");

exports.completeContentProcess = onMessagePublished('complete-content-process', async (event) => {
    try {
        const data = decodePubSubMessage(event);
        const { influencerId } = data;

        console.log(`Content process completed for influencer ${influencerId}`);
        await updateStatus(influencerId, 'Content validated');
    } catch (error) {
        console.error('Error completing content process:', error.message);
    }
});
