const { getAll, add } = require('../services/influencerService');

exports.getInfluencers = async (req, res, next) => {
    try {
        const influencers = await getAll();
        res.json(influencers);
    } catch (error) {
        next(error);
    }
};

exports.addInfluencer = async (req, res, next) => {
    try {
        const influencer = await add(req.body);
        res.status(201).json(influencer);
    } catch (error) {
        next(error);
    }
};
