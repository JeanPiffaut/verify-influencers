class Content {
    constructor(id, influencerId, type, text, metadata, createdAt) {
        this.id = id;
        this.influencerId = influencerId; // Relación con el influencer
        this.type = type; // Tipo de contenido: tweet, post, etc.
        this.text = text; // Contenido textual
        this.metadata = metadata; // Información adicional (likes, retweets, etc.)
        this.createdAt = createdAt || new Date().toISOString(); // Fecha de creación
    }

    // Método para verificar si el contenido es válido
    isValid() {
        return this.text && this.text.length > 5; // Ejemplo: validar longitud mínima
    }
}

module.exports = Content;
