class Influencer {
    constructor(id, name, lastSearchDate, status, score, data, twitterId) {
        this.id = id;
        this.name = name;
        this.lastSearchDate = lastSearchDate || null; // Fecha de última actualización
        this.status = status || 'new'; // Estados posibles: new, updating, done
        this.score = score || null;
        this.data = data || {}; // Información adicional del influencer
        this.twitterId = twitterId;
    }

    // Verificar si el perfil necesita actualización
    needsUpdate() {
        if (this.status !== 'done') return false;

        const today = new Date().toISOString().split('T')[0];
        return this.lastSearchDate !== today;
    }
}

module.exports = Influencer;
