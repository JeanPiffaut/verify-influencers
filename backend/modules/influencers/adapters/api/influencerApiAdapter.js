const { handleInfluencerLogic } = require('../../services/influencerService');
const { HttpsError } = require('firebase-functions/v2/https');

exports.handleInfluencerRequest = async (data) => {
    try {
        const { name } = data.data.payload;

        if (!name) {
            throw new HttpsError('invalid-argument', 'Influencer name are required.');
        }

        console.log(`Received request for influencer: ${name}`);

        const result = await handleInfluencerLogic(name);
        return result;
    } catch (error) {
        console.error('Error handling influencer request:', error.message);
        throw new HttpsError(error.code || 'internal', error.message || 'Internal server error.');
    }
};
