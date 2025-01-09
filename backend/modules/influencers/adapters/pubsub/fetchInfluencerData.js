const { onMessagePublished } = require('firebase-functions/v2/pubsub');
const { fetchInfluencerData } = require('../../services/influencerService');
const { publishMessage, decodePubSubMessage } = require('../../../shared/utils/pubsub');

// Función Pub/Sub para manejar la extracción de datos del influencer
exports.fetchInfluencerDataHandler = onMessagePublished('fetch-influencer-data', async (event) => {
    try {
        // Decodificar mensaje Pub/Sub
        const { influencerId, period } = decodePubSubMessage(event);
        console.log(`Fetching data for influencer ${influencerId} within period`, period);

        // Obtener datos del influencer y contenido desde la API de Twitter
        const influencerData = await fetchInfluencerData(influencerId, period);

        console.log(`Fetched data for influencer ${influencerId}. Saving content...`);

        // Publicar el siguiente paso en el flujo
        if (influencerData.tweets.length === 0) {
            await publishMessage('complete-content-process', { influencerId });
            return;
        }

        await publishMessage('validate-content', { influencerId });

        console.log(`Content saved and validation process initiated for ${influencerId}.`);
    } catch (error) {
        console.error('Error fetching influencer data:', error.message);
        throw new Error(`Error fetching influencer data: ${error.message}`);
    }
});
