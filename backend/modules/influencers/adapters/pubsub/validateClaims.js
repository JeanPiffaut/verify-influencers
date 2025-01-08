const { onMessagePublished } = require('firebase-functions/v2/pubsub');
const { validateInfluencerClaims } = require('../../services/influencerService');

exports.validateClaims = onMessagePublished('validate-claims', async (event) => {
    const { name } = event.data.json();

    try {
        await validateInfluencerClaims(name);
    } catch (error) {
        console.error(`Error validating influencer claims: ${error.message}`);
    }
});
