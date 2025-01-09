const { onTaskDispatched } = require('firebase-functions/v2/tasks');
const {publishMessage} = require("../../../shared/utils/pubsub");

/**
 * Handler para procesar la cola de solicitudes.
 */
exports.fetchDataQueueHandler = onTaskDispatched(async (data) => {
    try {
        const { influencerId, period } = data.data;
        console.log(`Processing task for influencer ${influencerId} in period`, period);

        // Lógica principal: Procesar datos del influencer
        await publishMessage('fetch-influencer-data', data.data);
    } catch (error) {
        console.error('Error processing queue task:', error.message);
        throw new Error(`Queue task failed: ${error.message}`);
    }
});
