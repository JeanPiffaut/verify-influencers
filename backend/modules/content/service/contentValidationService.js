const { getContentByInfluencerId, saveContent } = require('../repository/contentRepository');
const Content = require("../domain/content");

exports.validateContent = async (influencerId) => {
    const contentList = await getContentByInfluencerId(influencerId);
    const validContent = contentList.filter((content) => content.isValid());

    if (validContent.length === 0) {
        throw new Error(`No valid content found for influencer ${influencerId}.`);
    }

    return validContent;
};

exports.saveNewContent = async (contentData) => {
    const content = new Content(
        null,
        contentData.influencerId,
        contentData.type,
        contentData.text,
        contentData.metadata
    );
    await saveContent(content);
    return content;
};
