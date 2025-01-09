const { getInfluencerById, updateScore } = require('../repository/influencerRepository');
const Score = require('../domain/score');

exports.calculateAndSaveScore = async (id) => {
    const influencer = await getInfluencerById(id);
    if (!influencer) {
        throw new Error(`Influencer with ID ${id} not found.`);
    }

    // Lógica para calcular el puntaje
    const { followers, tweets } = influencer.data;
    const engagementRate = tweets > 0 ? followers / tweets : 0; // Simulación de engagement
    const contentQuality = Math.random() * 5; // Simulación de calidad (0 a 5)

    const score = new Score(followers, engagementRate, contentQuality).calculate();
    await updateScore(id, score);

    return score;
};
