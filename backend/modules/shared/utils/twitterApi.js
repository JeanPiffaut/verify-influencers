const twitterClient = require('./twitterClient');

/**
 * Obtiene los tweets de un usuario en un rango de fechas.
 * @param {string} username - Nombre de usuario de Twitter (sin @).
 * @param {string} startDate - Fecha de inicio en formato 'YYYY-MM-DD'.
 * @param {string} endDate - Fecha de fin en formato 'YYYY-MM-DD'.
 * @returns {Promise<Array>} - Lista de tweets.
 */
exports.getTweets = async (username, startDate, endDate) => {
    try {
        // Obtiene la información del usuario para acceder a su ID
        const user = await twitterClient.v2.userByUsername(username);
        const userId = user.data.id;

        // Parámetros para la búsqueda de tweets
        const params = {
            'start_time': new Date(startDate).toISOString(),
            'end_time': new Date(endDate).toISOString(),
            'max_results': 100, // Máximo permitido por la API en una sola solicitud
            'tweet.fields': 'created_at,public_metrics',
        };

        // Realiza la solicitud para obtener los tweets del usuario en el rango de fechas
        const tweets = [];
        let hasNextPage = true;
        let nextToken = null;

        while (hasNextPage) {
            const response = await twitterClient.v2.userTimeline(userId, {
                ...params,
                pagination_token: nextToken,
            });

            if (response.data) {
                tweets.push(...response.data);
            }

            nextToken = response.meta.next_token;
            hasNextPage = !!nextToken;
        }

        return tweets;
    } catch (error) {
        console.error('Error fetching tweets:', error);
        throw new Error('Failed to fetch tweets from Twitter API.');
    }
};
