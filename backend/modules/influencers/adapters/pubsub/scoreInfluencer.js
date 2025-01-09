const { onMessagePublished } = require('firebase-functions/v2/pubsub');
const { calculateAndSaveScore } = require('../../services/scoringService');
const { publishMessage } = require('../../../shared/utils/pubsub');

exports.scoreInfluencer = onMessagePublished('score-influencer', async (event) => {
    try {
        const data = JSON.parse(Buffer.from(event.data.message.data, 'base64').toString('utf-8'));
        const { influencerId } = data;

        const score = await calculateAndSaveScore(influencerId);
        console.log(`Score for influencer ${influencerId}: ${score}`);

        await publishMessage('complete-process', { influencerId });
    } catch (error) {
        console.error('Error scoring influencer:', error.message);
    }
});
