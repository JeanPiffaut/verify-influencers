const { getInfluencerById, saveInfluencer, updateLastSearchDate, updateScore, createInfluencer, getInfluencerByName,
    updateInfluencerStatus
} = require('../repository/influencerRepository');
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

exports.handleInfluencerLogic = async (name) => {
    const influencer = await getInfluencerByName(name);
    const today = new Date();

    if (!influencer) {
        // Calcular rango de fechas: últimos 3 meses
        const startDate = new Date();
        startDate.setMonth(today.getMonth() - 3);

        const newInfluencer = await createInfluencer(name);
        await updateInfluencerStatus(newInfluencer.id, 'updating');

        await publishMessage('fetch-influencer-data', {
            influencerId: newInfluencer.id,
            period: {
                startDate: startDate.toISOString().split('T')[0],
                endDate: today.toISOString().split('T')[0],
            },
        });

        return {
            status: 'new',
            message: 'Data is being fetched.',
            influencer: newInfluencer,
        };
    }

    if (influencer.status === 'updating') {
        return { status: 'updating', message: 'Data is being updated.', influencer };
    }

    if (influencer.needsUpdate()) {
        const startDate = influencer.lastSearchDate
            ? new Date(influencer.lastSearchDate)
            : new Date(today.setMonth(today.getMonth() - 3));

        await updateInfluencerStatus(influencer.id, 'updating');

        await publishMessage('fetch-influencer-data', {
            influencerId: influencer.id,
            period: {
                startDate: startDate.toISOString().split('T')[0],
                endDate: today.toISOString().split('T')[0],
            },
        });

        return {
            status: 'in-progress',
            message: 'Data update started.',
            influencer,
        };
    }

    return { status: 'done', message: 'Data is up-to-date.', influencer };
};
