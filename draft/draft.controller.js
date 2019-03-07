const express = require('express');
const router = express.Router();
const draftService = require('./draft.service');

// routes
router.get('/getDraftState/:id', getDraftByUserId);
router.post('/startDraft', startDraft);
router.post('/selectFormation', selectFormation);
router.post('/drawPlayer', drawPlayer);
router.post('/selectPlayer', selectPlayer);

module.exports = router;

function getDraftByUserId(req, res, next) {
    draftService.getDraftByUserId(req.params.id)
        .then(draft => res.json(draft))
        .catch(err => next(err));
}

function startDraft(req, res, next) {
    draftService.startDraft(req.body)
        .then(formations => res.json(formations))
        .catch(err => next(err));
}

function selectFormation(req, res, next) {
    draftService.selectFormation(req.body)
        .then(() => res.json())
        .catch(err => next(err));
}

function drawPlayer(req, res, next) {
    draftService.drawPlayer(req.body)
        .then(players => res.json(players))
        .catch(err => next(err));
}

function selectPlayer(req, res, next) {
    draftService.selectPlayer(req.body)
        .then(() => res.json())
        .catch(err => next(err));
}
