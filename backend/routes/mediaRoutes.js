const express = require('express');
const router = express.Router();
const mediaService = require('../services/mediaService');

router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const paginatedMedia = await mediaService.getMediaList(page, limit);
        res.status(200).send(paginatedMedia);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

module.exports = router;
