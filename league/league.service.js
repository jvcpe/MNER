const db = require('_helpers/db');
const League = db.League;
const User = db.User;

module.exports = {
    getAllUserLeagues,
    create,
    getLeagueById,
    joinLeague
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

async function joinLeague(param) {
    const league = await League.findById(param.league);
    if ( !league ) {
        throw "This code belong to no league"
    }

    if( !(await User.findById(param.user))) {
        throw "This user do not exist"
    }

    league.user.push(param.user);
    league.save();
}
