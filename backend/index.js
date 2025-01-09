require("./modules/shared/firebase/admin");
const { onCall } = require('firebase-functions/v2/https');
const {handleInfluencerRequest} = require("./modules/influencers/adapters/api/influencerApiAdapter");
const {fetchDataQueueHandler} = require("./modules/influencers/adapters/queue/fetchDataQueue");
const {fetchInfluencerDataHandler} = require("./modules/influencers/adapters/pubsub/fetchInfluencerData");
const {validateContent} = require("./modules/content/adapters/pubsub/validateContent");
const {scoreInfluencer} = require("./modules/influencers/adapters/pubsub/scoreInfluencer");
const {completeContentProcess} = require("./modules/content/adapters/pubsub/completeContentProcess");

exports.api = onCall(handleInfluencerRequest);

// Exporta las funciones
exports.fetchDataQueueHandler = fetchDataQueueHandler;
exports.fetchInfluencerDataHandler = fetchInfluencerDataHandler;
exports.validateContent = validateContent;
exports.scoreInfluencer = scoreInfluencer;
exports.completeContentProcess = completeContentProcess;
