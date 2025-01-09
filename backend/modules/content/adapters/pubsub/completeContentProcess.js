const { onMessagePublished } = require('firebase-functions/v2/pubsub');
const {decodePubSubMessage} = require("../../../shared/utils/pubsub");
const {updateInfluencerStatus} = require("../../../influencers/repository/influencerRepository");

exports.completeContentProcess = onMessagePublished('complete-content-process', async (event) => {
    try {
        const {influencerId} = decodePubSubMessage(event);

        console.log(`Content process completed for influencer ${influencerId}`);
        await updateInfluencerStatus(influencerId, 'done');
    } catch (error) {
        console.error('Error completing content process:', error.message);
    }
});
