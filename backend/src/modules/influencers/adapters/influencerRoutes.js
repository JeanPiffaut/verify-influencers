const express = require('express');
const { getInfluencers, addInfluencer } = require('./influencerController');
const router = express.Router();

router.get('/', getInfluencers);
router.post('/', addInfluencer);

module.exports = router;
