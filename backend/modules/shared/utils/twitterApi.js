const twitterClient = require('./twitterClient');
const Content = require("../../content/domain/content");

/**
 * Obtiene los tweets de un usuario en un rango de fechas.
 * @param userId
 * @param {string} startDate - Fecha de inicio en formato 'YYYY-MM-DD'.
 * @param {string} endDate - Fecha de fin en formato 'YYYY-MM-DD'.
 * @returns {Promise<Array>} - Lista de tweets.
 */
exports.getTweets = async (userId, startDate, endDate) => {
    try {
        // Parámetros para la búsqueda de tweets
        const params = {
            max_results: 100,
            //'tweet.fields': 'created_at,public_metrics',
            'start_time': new Date(startDate).toISOString(),
            'end_time': new Date(endDate).toISOString(),
        };

        // Realiza la solicitud para obtener los tweets del usuario
        const response = await twitterClient.v2.userTimeline(userId, params);
        console.log(response);
        // Verifica si la propiedad 'data' existe y es un arreglo
        if (Array.isArray(response.data)) {
            // Mapear los tweets a instancias del modelo Content
            const contents = response.data.map((tweet) => {
                const metadata = {
                    retweets: tweet.public_metrics.retweet_count,
                    likes: tweet.public_metrics.like_count,
                    replies: tweet.public_metrics.reply_count,
                    quotes: tweet.public_metrics.quote_count,
                };

                return new Content(null, null, 'tweet', tweet.text, metadata, tweet.created_at);
            });

            // Filtrar contenido no válido según el modelo
            return contents.filter((content) => content.isValid());
        } else {
            console.warn(`No tweets found for user: ${username}`);
            return [];
        }
    } catch (error) {
        if (error.code === 429 && error.rateLimit) {
            const resetTimeout = error.rateLimit.reset * 1000; // Convertir a milisegundos
            const timeToWait = resetTimeout - Date.now();
            console.warn(`Rate limit reached. Retrying after ${Math.ceil(timeToWait / 1000)} seconds...`);
        }
        console.error('Error fetching tweets:', error);
        throw new Error('Failed to fetch tweets from Twitter API.');
    }
};