const express = require('express');
const router = express.Router();
const leagueService = require('./league.service');

// routes
router.post('/getAllUserLeagues', getAllUserLeagues);
router.post('/create', create);

module.exports = router;

function getAllUserLeagues(req, res, next) {
    leagueService.getAllUserLeagues(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function create(req, res, next) {
    console.log('league controller');
    leagueService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
