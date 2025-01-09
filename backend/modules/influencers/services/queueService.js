const { getFunctions } = require('firebase-admin/functions');

/**
 * Servicio para manejar la cola de tareas.
 */
exports.addToQueue = async (influencerId, period) => {
    try {
        const queue = getFunctions().taskQueue('queue/fetchDataQueueHandler');
        await queue.enqueue({ influencerId, period });
        console.log(`Task added to queue for influencer ${influencerId}`);
    } catch (error) {
        console.error('Error adding task to queue:', error.message);
        throw error;
    }
};

/**
 * Verifica si un influencer ya está en la cola.
 * @param {string} name - Nombre del influencer.
 * @returns {number|null} - Posición en la cola o `null` si no está.
 */
exports.checkQueueForInfluencer = async (name) => {
    try {
        const queue = getFunctions().taskQueue('queue/fetchDataQueueHandler');
        const tasks = await queue.getTasks();
        const position = tasks.findIndex((task) => task.payload.name === name);
        return position >= 0 ? position + 1 : null;
    } catch (error) {
        console.error('Error checking queue for influencer:', error.message);
        return null;
    }
};
