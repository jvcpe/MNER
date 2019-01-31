const db = require('_helpers/db');
const League = db.League;
const User = db.User;

module.exports = {
    getAllUserLeagues,
    create,
    getLeagueById,
    joinLeague,
    deleteUserFromLeague
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

async function deleteUserFromLeague(param) {
    const league = await League.findById(param.leagueId);
    if ( !league ) {
        throw "This code belong to no league"
    }

    if( !(await User.findById(param.playerId))) {
        throw "This user do not exist"
    }

    let index = league.user.indexOf(param.playerId);
    if (index > -1) {
        league.user.splice(index, 1);
    }
    league.save();
}
