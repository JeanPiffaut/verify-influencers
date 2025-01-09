class Influencer {
    constructor(id, name, lastSearchDate, score, data) {
        this.id = id;
        this.name = name;
        this.lastSearchDate = lastSearchDate;
        this.score = score;
        this.data = data; // Datos adicionales sobre el influencer
    }

    needsUpdate() {
        const today = new Date();
        return this.lastSearchDate !== today;
    }

    updateScore(newScore) {
        this.score = newScore;
    }
}

module.exports = Influencer;
