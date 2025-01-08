const express = require('express');
const { onRequest } = require('firebase-functions/v2/https');
const {errorMiddleware} = require("../modules/shared/middlewares/errorMiddleware");
const influencerRoutes = require('../modules/influencers/adapters/influencerRoutes');

const app = express();
app.use(express.json());

// Rutas principales
app.use('/api/influencers', influencerRoutes);

// Middleware de errores
app.use(errorMiddleware);
exports.api = onRequest(app);
