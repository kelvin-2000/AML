const express = require('express');
const router = express.Router();
const memberService = require('../services/memberService');

router.get('/', async (req, res) => {
    try {
        const response = await memberService.getMemberListWithFormattedField();
        res.status(200).send(response);
    } catch (err) {
        console.error('Error in /members route:', err.message);
        res.status(500).send({ error: 'Failed to fetch member list.' });
    }
});

module.exports = router;
