const express = require('express');
const router = express.Router();
const borrowService = require('../services/borrowService');

router.post('/', async (req, res) => {
    try {
        const { memberId, mediaId, dueDate, pickupDeliveryChoice } = req.body;
        const requestId = await borrowService.borrowMedia(memberId, mediaId, dueDate, pickupDeliveryChoice);
        res.status(200).send({ message: 'Borrowing successful.', requestId });
        
    } catch (err) {
        console.log("checking error ===> " , err.message);
        
        res.status(400).send({ error: err.message });
    }
});

module.exports = router;
