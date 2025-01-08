const { onCall } = require('firebase-functions/v2/https');
const { fetchInfluencerData } = require('./modules/influencers/adapters/pubsub/fetchInfluencerData');
const { validateClaims } = require('./modules/influencers/adapters/pubsub/validateClaims');
const { handleInfluencerRequest } = require('./app/app');

exports.fetchInfluencerData = fetchInfluencerData;
exports.validateClaims = validateClaims;

// Cambiar la API HTTP a API Callable
exports.api = onCall(handleInfluencerRequest);
