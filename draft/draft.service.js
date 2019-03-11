const db = require('_helpers/db');
const Draft = db.Draft;
const Formation = db.Formation;
const Player = db.Player;
const Team = db.Team;
const constants = require('../constants/constants');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

module.exports = {
    getDraftByUserId,
    createDraft,
    startDraft,
    selectFormation,
    drawPlayer,
    selectPlayer,
};

async function getDraftByUserId(userId) {
    return Draft.findOne({userId})
        .populate('currentFormation')
        .populate('draftedFormation')
        .populate('currentDraw')
        .populate('draftedPlayer');
}

async function createDraft(userId) {
    // validate
    if (await Draft.findOne({userId})) {
        throw "A draft already exist";
    }

    const draft = new Draft({userId});

    // save user
    await draft.save();
}

async function startDraft(param) {
    console.log(param);
    // validate
    if (await !Draft.findOne({_id: param.draftId})) {
        throw "[Draft] This draft does not exist";
    }

    let currentFormation = [];
    let currentFormationId = [];

    for (let i = 0; i < constants.NUMBER_OF_FORMATION; i++) {
        console.log("currentFormationId : " + currentFormationId);
        let result = await Formation.aggregate([{ $match: {"_id": {"$nin": currentFormationId}}}, {$sample: {size: 1}}]);
        console.log("result : " + JSON.stringify(result));
        if(result) {
            currentFormation.push(result[0]);
            currentFormationId.push(result[0]._id);
        }
    }

    console.log("currentFormation : " + currentFormation);
    if(currentFormation.length !== constants.NUMBER_OF_FORMATION) {
        console.log("[Draft] Error while updating draft.");
        throw "[Draft] Error while updating draft.";
    }
    console.log("done");

    let newDoc = await Draft.findByIdAndUpdate({_id : param.draftId}, {state : 'in_progress', currentFormation : currentFormationId}, {new: true},(err, update) =>{
        console.log("update : " + update);
        if(err) {
            console.log("[Draft] Error while updating draft.");
            throw "[Draft] Error while updating draft.";
        }
        console.log("[Draft] Update done");
    });
    return {data : currentFormation};
}

async function selectFormation(param) {
    await Draft.findByIdAndUpdate({_id : param.draftId}, {draftedFormation : param.formationId, currentFormation : []}, {new: true},(err, update) =>{
        console.log("updated selected formation : " + update);
        if(err) {
            console.log("[Draft] Error while selecting formation.");
            throw "[Draft]Error while selecting formation.";
        }
        console.log("[Draft] Formation selection done");
    });
}

async function drawPlayer(param) {
    let league = "";
    const draft = await Draft.findById({_id : param.draftId}, (err, draft) => {
        if(err) {
            console.log("[Draft] Error while selecting draft.");
            throw "[Draft]Error while selecting draft.";
        }
        league = draft.league;
        //draftedPlayer = draft.draftedPlayer;
    });

    let currentPlayer = [];
    let currentPlayerId = [];
    console.log("League : " + league);
    for (let i = 0; i < constants.NUMBER_OF_PLAYER; i++) {
        console.log("currentPlayerId : " + currentPlayerId);
        let result = await Player.aggregate([{ $match: { $and: [{"_id": {"$nin": currentPlayerId}}, {"league" : league}, {$or: [{"fav_position" : param.position}, {"position" : param.position}]}]}}, {$sample: {size: 1}}]);
        console.log("result : " + JSON.stringify(result));
        if(result.length !== 0) {
            currentPlayer.push(result[0]);
            currentPlayerId.push(result[0]._id);
        }
    }

    console.log("currentPlayer : " + currentPlayer);
    if(currentPlayer.length !== constants.NUMBER_OF_PLAYER) {
        console.log("[Draft] Error while updating draft.");
        throw "[Draft] Error while updating draft.";
    }
    console.log("done");

    let newDoc = await Draft.findByIdAndUpdate({_id : param.draftId}, {currentDraw : currentPlayerId}, {new: true},(err, update) => {
        console.log("update : " + update);
        if(err) {
            console.log("[Draft] Error while updating draft.");
            throw "[Draft] Error while updating draft.";
        }
        console.log("[Draft] Update done");
    });
    return {data : currentPlayer};
}

async function selectPlayer(param) {
    console.log("select player");
    console.log("param player id : " + param.playerId);
    Draft.findByIdAndUpdate({_id : param.draftId},  { currentDraw : [], $push: { draftedPlayer : param.playerId } }, {new: true},(err, update) => {
        console.log("updated selected player : " + update);
        if(err) {
            console.log("[Draft] Error while selecting player.");
            throw "[Draft]Error while selecting player.";
        }
        console.log("[Draft] Player selection done");
        console.log("updated selected player : " + update);
        if(update.draftedPlayer.length === constants.NUMBER_OF_DRAFTED_PLAYER) {
            Draft.findByIdAndUpdate({_id : update._id}, {state : 'done'}, (err, update) => {
                if(err) {
                    console.log("[Draft] Error while closing draft.");
                    throw "[Draft] Error while closing draft.";
                }
                console.log("[Draft] Draft done");
            });

            Player.find({ID : 204819}, (err, player) => {
                if(err) {
                    console.log("[Draft] Error while creating team.");
                    throw "[Draft] Error while creating team.";
                }

                let defaultTeam = [];

                for(let i = 0; i < constants.NUMBER_OF_PLAYER_IN_TEAM; i++) {
                    defaultTeam.push(player[0]._id);
                }

                const team = new Team({
                    userId: update.userId,
                    formation: update.draftedFormation,
                    players: update.draftedPlayer,
                    team : defaultTeam,
                });

                team.save();
            });
        }
    });
}
