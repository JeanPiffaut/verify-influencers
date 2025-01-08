const admin = require('../../shared/firebase/admin');
const db = admin.firestore();

exports.updateStatus = async (name, status) => {
    const influencerRef = db.collection('influencers').doc(name);

    const doc = await influencerRef.get();
    if (!doc.exists) {
        throw new Error(`Influencer ${name} does not exist`);
    }

    await influencerRef.update({
        status,
        updatedAt: Date.now(),
    });
};
