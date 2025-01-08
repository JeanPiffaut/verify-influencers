const { fetchInfluencerData } = require('./modules/influencers/adapters/pubsub/fetchInfluencerData');
const { validateClaims } = require('./modules/influencers/adapters/pubsub/validateClaims');
const {api} = require("./app/app");

exports.fetchInfluencerData = fetchInfluencerData;
exports.validateClaims = validateClaims;

// Exportar la API HTTP
exports.api = api;
