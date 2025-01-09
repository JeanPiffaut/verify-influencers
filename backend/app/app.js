const { processInfluencerData } = require('../modules/influencers/services/influencerService');
const { HttpsError } = require('firebase-functions/v2/https');


exports.handleInfluencerRequest = async (data, context) => {
    try {
        // Procesar las solicitudes según el tipo de acción
        const { action, payload } = data.data;

        switch (action) {
            case 'start':
                return await processInfluencerData(payload.name);
            default:
                throw new HttpsError(
                    'invalid-argument',
                    `Unsupported action: ${action}`
                );
        }
    } catch (error) {
        console.error('Error in callable function:', error.message);
        throw new HttpsError('internal', error.message);
    }
};
