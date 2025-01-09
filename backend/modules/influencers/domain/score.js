class Score {
    constructor(followers, engagementRate, contentQuality) {
        this.followers = followers;
        this.engagementRate = engagementRate;
        this.contentQuality = contentQuality;
    }

    // Método para calcular el puntaje total
    calculate() {
        const followersScore = Math.min(this.followers / 10000, 10); // Máximo 10 puntos
        const engagementScore = this.engagementRate * 5; // Engagement rate entre 0 y 2, multiplicado por 5
        const qualityScore = this.contentQuality; // Calidad del contenido, valor directo

        return Math.min(followersScore + engagementScore + qualityScore, 20); // Puntaje máximo: 20
    }
}

module.exports = Score;
