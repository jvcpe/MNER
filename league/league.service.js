const db = require('_helpers/db');
const League = db.League;

module.exports = {
    getAllUserLeagues,
    create,
    getLeagueById
};

async function getAllUserLeagues(leagueParam) {
    return await League.find({user : leagueParam.id});
}

async function create(leagueParam) {
    const league = new League({
        name: leagueParam.name,
        creator: leagueParam.creator,
        user: [leagueParam.creator],
    });

    // save league
    await league.save();
}

async function getLeagueById(id) {
    return await League.findById(id);
}
