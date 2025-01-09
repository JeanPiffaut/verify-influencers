const { onMessagePublished } = require('firebase-functions/v2/pubsub');
const { fetchInfluencerData } = require('../../services/influencerService');
const { publishMessage, decodePubSubMessage} = require('../../../shared/utils/pubsub');

// Función Pub/Sub para manejar la extracción de datos del influencer
exports.fetchInfluencerDataHandler = onMessagePublished('fetch-influencer-data', async (event) => {
    try {
        // Decodificar el mensaje del evento Pub/Sub
        const data = decodePubSubMessage(event);
        const { influencerId } = data;

        // Lógica de negocio: obtener datos del influencer
        const influencerData = await fetchInfluencerData(influencerId);
        console.log(`Fetched data for influencer ${influencerId}:`, influencerData);

        // Publicar el siguiente paso del flujo
        await publishMessage('validate-influencer', { influencerId });
    } catch (error) {
        console.error('Error fetching influencer data:', error.message);
        throw new Error(`Error fetching influencer data: ${error.message}`);
    }
});
