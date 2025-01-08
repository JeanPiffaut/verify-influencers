const express = require('express');
const { errorMiddleware } = require('../shared/middlewares/errorMiddleware');
const influencerRoutes = require('../modules/influencers/adapters/influencerRoutes');
const claimRoutes = require('../modules/claims/adapters/claimRoutes');

const app = express();
app.use(express.json());

// Rutas principales
app.use('/api/influencers', influencerRoutes);
app.use('/api/claims', claimRoutes);

// Middleware de errores
app.use(errorMiddleware);

module.exports = app;
