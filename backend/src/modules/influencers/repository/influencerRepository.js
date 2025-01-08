const admin = require('../../shared/firebase/admin');
const db = admin.firestore();
const collection = db.collection('influencers');

exports.getAllInfluencers = async () => {
    const snapshot = await collection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

exports.addInfluencer = async (data) => {
    const docRef = await collection.add(data);
    return { id: docRef.id, ...data };
};
