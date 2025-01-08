const { getAllInfluencers, addInfluencer } = require('../repository/influencerRepository');

exports.getAll = async () => {
    return await getAllInfluencers();
};

exports.add = async (data) => {
    return await addInfluencer(data);
};
