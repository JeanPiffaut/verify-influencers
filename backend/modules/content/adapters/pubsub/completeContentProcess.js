const { onMessagePublished } = require('firebase-functions/v2/pubsub');
const { updateStatus } = require('../../repository/contentRepository');

exports.completeContentProcess = onMessagePublished('complete-content-process', async (event) => {
    try {
        const data = JSON.parse(Buffer.from(event.data.message.data, 'base64').toString('utf-8'));
        const { influencerId } = data;

        console.log(`Content process completed for influencer ${influencerId}`);
        await updateStatus(influencerId, 'Content validated');
    } catch (error) {
        console.error('Error completing content process:', error.message);
    }
});
