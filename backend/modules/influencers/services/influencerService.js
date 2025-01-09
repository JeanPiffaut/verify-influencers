const { getInfluencerById, saveInfluencer, updateLastSearchDate, updateScore} = require('../repository/influencerRepository');
const Influencer = require('../domain/influencer');

exports.checkLastSearch = async (id) => {
    const influencer = await getInfluencerById(id);
    if (!influencer) {
        return null; // No existe
    }
    return influencer.needsUpdate(); // Verifica si necesita actualización
};

exports.fetchInfluencerData = async (id) => {
    // Aquí se simula una llamada a una API externa para obtener datos del influencer
    const dataFromAPI = {
        id: id,
        name: 'John Doe',
        data: { followers: 10000, tweets: 500 },
    };
    const influencer = new Influencer(dataFromAPI.id, dataFromAPI.name, new Date(), null, dataFromAPI.data);

    await saveInfluencer(influencer);
    return influencer;
};

exports.updateInfluencerScore = async (id, score) => {
    await updateLastSearchDate(id);
    await updateScore(id, score);
};
