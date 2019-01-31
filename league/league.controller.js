const express = require('express');
const router = express.Router();
const leagueService = require('./league.service');

// routes
router.post('/getAllUserLeagues', getAllUserLeagues);
router.get('/getLeagueById/:id', getLeagueById);
router.post('/create', create);
router.post('/joinLeague', joinLeague);
router.post('/deleteUserFromLeague', deleteUserFromLeague);

module.exports = router;

function getAllUserLeagues(req, res, next) {
    leagueService.getAllUserLeagues(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}

function create(req, res, next) {
    leagueService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getLeagueById(req, res, next) {
    leagueService.getLeagueById(req.params.id)
        .then(league => league ? res.json(league) : res.sendStatus(404))
        .catch(err => next(err));
}

function joinLeague(req, res, next) {
    leagueService.joinLeague(req.body)
        .then(() => res.json())
        .catch(err => next(err));
}

function deleteUserFromLeague(req, res, next) {
    leagueService.deleteUserFromLeague(req.body)
        .then(() => res.json())
        .catch(err => next(err));
}
