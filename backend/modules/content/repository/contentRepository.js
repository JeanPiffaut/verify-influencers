const { getFirestore } = require('firebase-admin/firestore');
const Content = require('../domain/content');

const db = getFirestore();

exports.getContentByInfluencerId = async (influencerId) => {
    const snapshot = await db.collection('content').where('influencerId', '==', influencerId).get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map((doc) => new Content(doc.id, ...doc.data()));
};

exports.saveContent = async (content) => {
    const docRef = db.collection('content').doc();
    content.id = docRef.id; // Asigna un ID único
    await docRef.set({
        influencerId: content.influencerId,
        type: content.type,
        text: content.text,
        metadata: content.metadata,
        createdAt: content.createdAt,
    });
};

exports.updateContentMetadata = async (contentId, metadata) => {
    await db.collection('content').doc(contentId).update({ metadata });
};
