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
    await docRef.set({
        influencerId: content.influencerId,
        text: content.text,
        createdAt: content.createdAt,
        metadata: content.metadata,
    });
};

exports.updateContentMetadata = async (contentId, metadata) => {
    await db.collection('content').doc(contentId).update({ metadata });
};
