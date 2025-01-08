const { onMessagePublished } = require('firebase-functions/v2/pubsub');
const { processInfluencerData } = require('../../services/influencerService');

exports.fetchInfluencerData = onMessagePublished('fetch-influencer-data', async (event) => {
    const { name } = event.data.json();

    try {
        await processInfluencerData(name);
    } catch (error) {
        console.error(`Error processing influencer data: ${error.message}`);
    }
});
