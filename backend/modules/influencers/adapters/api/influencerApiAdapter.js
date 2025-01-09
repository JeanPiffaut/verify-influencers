const { handleInfluencerLogic } = require('../../services/influencerService');
const { HttpsError } = require('firebase-functions/v2/https');

exports.handleInfluencerRequest = async (data) => {
    try {
        const { id, name } = data.data.payload;

        if (!id || !name) {
            throw new HttpsError('invalid-argument', 'Influencer ID and name are required.');
        }

        console.log(`Received request for influencer: ${name} (${id})`);

        const result = await handleInfluencerLogic(id, name);
        return result;
    } catch (error) {
        console.error('Error handling influencer request:', error.message);
        throw new HttpsError(error.code || 'internal', error.message || 'Internal server error.');
    }
};
