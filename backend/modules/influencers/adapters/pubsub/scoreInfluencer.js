const { onMessagePublished } = require('firebase-functions/v2/pubsub');
const { calculateAndSaveScore } = require('../../services/scoringService');
const { publishMessage, decodePubSubMessage} = require('../../../shared/utils/pubsub');

exports.scoreInfluencer = onMessagePublished('score-influencer', async (event) => {
    try {
        const {id} = decodePubSubMessage(event);

        const score = await calculateAndSaveScore(id);
        console.log(`Score for influencer ${id}: ${score}`);

        await publishMessage('complete-content-process', {id});
    } catch (error) {
        console.error('Error scoring influencer:', error.message);
    }
});
