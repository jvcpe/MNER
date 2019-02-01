const express = require('express');
const router = express.Router();
const draftService = require('./draft.service');

// routes
router.post('/getDraftState/:id', getDraftByUserId);

module.exports = router;

function getDraftByUserId(req, res, next) {
    draftService.getDraftByUserId(req.params.id)
        .then(draft => res.json(draft))
        .catch(err => next(err));
}
