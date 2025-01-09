class Influencer {
    constructor(id, name, lastSearchDate, score, data) {
        this.id = id;
        this.name = name;
        this.lastSearchDate = lastSearchDate;
        this.score = score;
        this.data = data; // Datos adicionales sobre el influencer
    }

    // Método para verificar si los datos están desactualizados
    needsUpdate() {
        const today = new Date().toISOString().split('T')[0];
        return this.lastSearchDate !== today;
    }

    // Método para actualizar el puntaje
    updateScore(newScore) {
        this.score = newScore;
    }
}

module.exports = Influencer;
