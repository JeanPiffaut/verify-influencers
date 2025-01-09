const { getInfluencerById, saveInfluencer, updateLastSearchDate, updateScore, createInfluencer} = require('../repository/influencerRepository');
const Influencer = require('../domain/influencer');
const {publishMessage} = require("../../shared/utils/pubsub");

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

exports.handleInfluencerLogic = async (id, name) => {
    const influencer = await getInfluencerById(id);

    if (!influencer) {
        // Crear nuevo perfil y publicar el evento de actualización
        const newInfluencer = await createInfluencer(id, name);
        await updateInfluencerStatus(id, 'updating');
        await publishMessage('fetch-influencer-data', { influencerId: id, period: '3m' });
        return { status: 'new', message: 'Data is being fetched.', influencer: newInfluencer };
    }

    if (influencer.status === 'updating') {
        return { status: 'updating', message: 'Data is being updated.', influencer };
    }

    if (influencer.needsUpdate()) {
        await updateInfluencerStatus(id, 'updating');
        await publishMessage('fetch-influencer-data', { influencerId: id, period: '3m' });
        return { status: 'in-progress', message: 'Data update started.', influencer };
    }

    return { status: 'done', message: 'Data is up-to-date.', influencer };
};
