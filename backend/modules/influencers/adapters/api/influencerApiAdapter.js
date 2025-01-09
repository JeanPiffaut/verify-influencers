const { checkLastSearch } = require('../../services/influencerService');
const {getInfluencerById} = require("../../repository/influencerRepository");
const {publishMessage} = require("../../../shared/utils/pubsub");

exports.handleInfluencerRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const needsUpdate = await checkLastSearch(id);

        if (needsUpdate) {
            await publishMessage('fetch-influencer-data', id);
            return res.status(200).json({ message: 'Fetching data', id });
        }

        const influencer = await getInfluencerById(id);

        res.status(200).json({ message: 'Data is up-to-date', influencer });
    } catch (error) {
        console.error('Error handling influencer request:', error.message);
        res.status(500).json({ error: error.message });
    }
};
