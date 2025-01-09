const { getInfluencerById, updateLastSearchDate, updateScore, createInfluencer, getInfluencerByName,
    updateInfluencerStatus
} = require('../repository/influencerRepository');
const {publishMessage} = require("../../shared/utils/pubsub");
const {saveContent} = require("../../content/repository/contentRepository");
const {getTweets} = require("../../shared/utils/twitterApi");

exports.checkLastSearch = async (id) => {
    const influencer = await getInfluencerById(id);
    if (!influencer) {
        return null; // No existe
    }
    return influencer.needsUpdate(); // Verifica si necesita actualización
};

exports.fetchInfluencerData = async (influencerId, period) => {
    // Obtener datos del influencer desde Firestore
    const influencer = await getInfluencerById(influencerId);
    if (!influencer) {
        throw new Error(`Influencer with ID ${influencerId} not found.`);
    }

    // Obtener contenido desde la API de Twitter
    const tweets = await getTweets(influencer.name, period.startDate, period.endDate);

    // Guardar cada tweet como contenido
    for (const tweet of tweets) {
        await saveContent({
            influencerId,
            text: tweet.text,
            createdAt: tweet.created_at,
            metadata: {
                retweets: tweet.public_metrics.retweet_count,
                likes: tweet.public_metrics.like_count,
            },
        });
    }

    return { influencer, tweets };
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
