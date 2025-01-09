const { getFirestore } = require('firebase-admin/firestore');
const Influencer = require('../domain/influencer');

const db = getFirestore();

exports.getInfluencerById = async (id) => {
    const doc = await db.collection('influencers').doc(id).get();
    if (!doc.exists) {
        return null;
    }
    const data = doc.data();
    return new Influencer(id, data.name, data.lastSearchDate, data.score, data.data);
};

exports.saveInfluencer = async (influencer) => {
    await db.collection('influencers').doc(influencer.id).set({
        name: influencer.name,
        lastSearchDate: influencer.lastSearchDate,
        score: influencer.score,
        data: influencer.data,
    });
};

exports.updateLastSearchDate = async (id) => {
    const today = new Date();
    await db.collection('influencers').doc(id).update({ lastSearchDate: today });
};

exports.updateScore = async (id, score) => {
    await db.collection('influencers').doc(id).update({ score });
};