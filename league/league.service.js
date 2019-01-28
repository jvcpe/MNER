const db = require('_helpers/db');
const League = db.League;

module.exports = {
    getAllUserLeagues,
    create
};

async function getAllUserLeagues(leagueParam) {
    console.log(leagueParam.id);
    return await League.find({user : leagueParam.id});
}

async function create(leagueParam) {
    console.log("league service");
    const league = new League({
        name: leagueParam.name,
        creator: leagueParam.creator,
        user: [leagueParam.creator],
    });

    // save league
    await league.save();
}
