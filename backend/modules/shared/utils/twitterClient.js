require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

// Configuración del cliente de Twitter con las credenciales de las variables de entorno
const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET_KEY,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

module.exports = twitterClient;
