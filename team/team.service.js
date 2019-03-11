const db = require('_helpers/db');
const User = db.User;
const Team = db.Team;

module.exports = {
    getTeam,
    _delete,
};

async function getTeam(userId) {
    return await Team.find({userId}).populate('players').populate('formation');
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
