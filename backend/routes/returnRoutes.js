const express = require('express');
const router = express.Router();
const returnService = require('../services/returnService');

router.post('/', async (req, res) => {
    try {
        const {memberId, mediaId} = req.body;
        const result = await returnService.returnMedia(memberId, mediaId);
        res.status(200).send({message: result.message, result});
    } catch (err) {
        res.status(400).send({error: err.message});
    }
});

module.exports = router;
