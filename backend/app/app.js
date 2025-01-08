const { processInfluencerData } = require('../modules/influencers/services/influencerService');
const { HttpsError } = require('firebase-functions/v2/https');


exports.handleInfluencerRequest = async (data, context) => {
    try {
        // Verifica autenticación si es requerida
        if (!context.auth) {
            throw new HttpsError(
                'unauthenticated',
                'Authentication is required to access this function.'
            );
        }

        // Procesar las solicitudes según el tipo de acción
        const { action, payload } = data;

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
