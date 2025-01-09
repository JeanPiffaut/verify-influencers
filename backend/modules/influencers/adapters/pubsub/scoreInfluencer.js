const { onMessagePublished } = require('firebase-functions/v2/pubsub');
const { calculateAndSaveScore } = require('../../services/scoringService');
const { publishMessage, decodePubSubMessage} = require('../../../shared/utils/pubsub');

exports.scoreInfluencer = onMessagePublished('score-influencer', async (event) => {
    try {
        const data = decodePubSubMessage(event);
        const { influencerId } = data;

        const score = await calculateAndSaveScore(influencerId);
        console.log(`Score for influencer ${influencerId}: ${score}`);

        await publishMessage('complete-content-process', { influencerId });
    } catch (error) {
        console.error('Error scoring influencer:', error.message);
    }
});
