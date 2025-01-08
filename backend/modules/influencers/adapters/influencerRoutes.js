const express = require('express');
const router = express.Router();
const {processInfluencerData} = require('../services/influencerService');

router.post('/:name', async (req, res, next) => {
    try {
        const {name} = req.body;
        const result = await processInfluencerData(name);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
