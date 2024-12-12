// const express = require('express');
// const router = express.Router();
// const returnService = require('../services/returnService');
//
// router.post('/', async (req, res) => {
//     try {
//         const { memberId, mediaId } = req.body;
//         const result = await returnService.returnMedia(memberId, mediaId);
//         res.status(200).send({ message: 'Returning  successful.', result });
//     } catch (err) {
//         res.status(400).send({ error: err.message });
//     }
// });
//
// module.exports = router;


const express = require('express');
const router = express.Router();
const returnService = require('../services/returnService');

router.post('/', async (req, res) => {
    try {
        const { requestId, memberId } = req.body;
        const result = await returnService.returnMedia(requestId, memberId);
        res.status(200).send(result);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

module.exports = router;
