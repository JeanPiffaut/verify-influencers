const { onMessagePublished } = require('firebase-functions/v2/pubsub');
const { updateContentMetadata } = require('../../repository/contentRepository');
const {decodePubSubMessage} = require("../../../shared/utils/pubsub");

exports.completeContentProcess = onMessagePublished('complete-content-process', async (event) => {
    try {
        const {id} = decodePubSubMessage(event);

        console.log(`Content process completed for influencer ${id}`);
        await updateContentMetadata(id, 'Content validated');
    } catch (error) {
        console.error('Error completing content process:', error.message);
    }
});
