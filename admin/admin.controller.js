const express = require('express');
const router = express.Router();
const adminService = require('./admin.service');

// routes
router.post('/importPlayer', importPlayer);

module.exports = router;

function importPlayer(req, res, next) {
    adminService.importPlayer(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
