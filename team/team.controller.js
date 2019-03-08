const express = require('express');
const router = express.Router();
const teamService = require('./team.service');

// routes
router.get('/getTeam/:id', getTeam);

module.exports = router;

function getTeam(req, res, next) {
    teamService.getTeam(req.params.id)
        .then(team => res.json(team))
        .catch(err => next(err));
}
