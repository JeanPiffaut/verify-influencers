const { getFunctions } = require('firebase-admin/functions');

/**
 * Servicio para manejar la cola de tareas.
 */
exports.addToQueue = async (influencerId, period) => {
    try {
        const queue = getFunctions().taskQueue('fetchDataQueueHandler');
        await queue.enqueue({ influencerId, period });
        console.log(`Task added to queue for influencer ${influencerId}`);
    } catch (error) {
        console.error('Error adding task to queue:', error.message);
        throw error;
    }
};
