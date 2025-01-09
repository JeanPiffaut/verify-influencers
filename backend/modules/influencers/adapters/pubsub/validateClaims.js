const { onMessagePublished } = require('firebase-functions/v2/pubsub');
const { validateInfluencerClaims } = require('../../services/influencerService');

exports.validateClaims = onMessagePublished('validate-claims', async (event) => {
    // Decodificar el mensaje
    const rawData = event.data.message.data; // Base64 codificado
    const decodedData = JSON.parse(Buffer.from(rawData, 'base64').toString('utf-8'));

    // Realiza el procesamiento necesario
    const { name } = decodedData;

    try {
        await validateInfluencerClaims(name);
    } catch (error) {
        console.error(`Error validating influencer claims: ${error.message}`);
    }
});
