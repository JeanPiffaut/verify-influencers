const { checkLastSearch } = require('../../services/influencerService');
const {getInfluencerById} = require("../../repository/influencerRepository");
const {publishMessage} = require("../../../shared/utils/pubsub");
const {HttpsError} = require("firebase-functions/v2/https");

exports.handleInfluencerRequest = async (data) => {
    try {
        const { id } = data.data.payload;
        const needsUpdate = await checkLastSearch(id);

        if (needsUpdate) {
            await publishMessage('fetch-influencer-data', id);
        }

        return await getInfluencerById(id);
    } catch (error) {
        console.error('Error handling influencer request:', error.message);
        throw new HttpsError(
            'invalid-argument',
            `Unsupported action`
        );
    }
};
