const express = require('express');
const router = express.Router();
const { startProcess } = require('../services/influencerService');

router.post('/start', async (req, res, next) => {
    try {
        const { name } = req.body;
        const result = await startProcess(name);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
