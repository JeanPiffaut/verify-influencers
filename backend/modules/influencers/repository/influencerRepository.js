const { getFirestore } = require('firebase-admin/firestore');
const Influencer = require('../domain/influencer');

const db = getFirestore();

exports.getInfluencerById = async (id) => {
    const doc = await db.collection('influencers').doc(id).get();
    if (!doc.exists) return null;

    const data = doc.data();
    return new Influencer(id, data.name, data.lastSearchDate, data.status, data.score, data.data);
};

exports.getInfluencerByName = async (name) => {
    const snapshot = await db.collection('influencers').where('name', '==', name).get();

    if (snapshot.empty) {
        return null;
    }

    const doc = snapshot.docs[0]; // Suponemos que los nombres son únicos
    const data = doc.data();
    return new Influencer(doc.id, data.name, data.lastSearchDate, data.status, data.data);
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

exports.createInfluencer = async (name) => {
    const docRef = db.collection('influencers').doc(); // Genera un ID automáticamente
    const influencer = new Influencer(docRef.id, name, null, 'new');

    await docRef.set({
        name: influencer.name,
        lastSearchDate: influencer.lastSearchDate,
        status: influencer.status,
        data: influencer.data,
    });

    return influencer;
};


exports.updateInfluencerStatus = async (id, status) => {
    await db.collection('influencers').doc(id).update({ status });
};