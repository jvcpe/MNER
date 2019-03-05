const express = require('express');
const router = express.Router();
const draftService = require('./draft.service');

// routes
router.get('/getDraftState/:id', getDraftByUserId);
router.post('/startDraft', startDraft);

module.exports = router;

function getDraftByUserId(req, res, next) {
    draftService.getDraftByUserId(req.params.id)
        .then(draft => res.json(draft))
        .catch(err => next(err));
}

function startDraft(req, res, next) {
    draftService.startDraft(req.body)
        .then(()=> console.log(res))
        .then(() => res.json())
        .catch(err => next(err));
}
