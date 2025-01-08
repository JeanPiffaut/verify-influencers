const { updateStatus } = require('../repository/influencerRepository');
const { publishMessage } = require('../../shared/utils/pubsub');

exports.processInfluencerData = async (name) => {
    await updateStatus(name, 'collecting');

    // Simula un retraso de 2 segundos
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await updateStatus(name, 'validating');
    await publishMessage('validate-claims', { name });
};

exports.validateInfluencerClaims = async (name) => {
    await updateStatus(name, 'scoring');

    // Simula un retraso de 2 segundos
    await new Promise((resolve) => setTimeout(resolve, 2000));

    await updateStatus(name, 'completed');
};