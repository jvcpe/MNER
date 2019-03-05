const db = require('_helpers/db');
const Draft = db.Draft;
const Formation = db.Formation;
const constants = require('../constants/constants');

module.exports = {
    getDraftByUserId,
    createDraft,
    startDraft,
};

async function getDraftByUserId(userId) {
    return Draft.findOne({userId});
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

async function selectFormationForDraft() {
    let currentFormation = [];
    let currentFormationId = [];

    for (let i = 0; i < constants.NUMBER_OF_FORMATION; i++) {
        await Formation.countDocuments({"_id": {"$nin": currentFormationId}}).exec(function (err, count) {
            // Get a random entry
            console.log("count : " + count);
            let random = Math.floor(Math.random() * count);
            console.log("random : " + random);
            // Again query all users but only fetch one offset by our random #
            Formation.findOne({"_id": {"$nin": currentFormation}}).skip(random).exec(
                function (err, result) {
                    console.log("result : " + result);
                    if(result) {
                        currentFormation.push(result);
                        currentFormationId.push(result._id);
                    }
                })
        });
    }

    return [currentFormation, currentFormationId];
}

async function startDraft(param) {
    console.log(param);
    // validate
    if (await !Draft.findOne({userId: param.userId})) {
        throw "[Draft] This draft does not exist";
    }

    [currentFormation, currentFormationId] = await selectFormationForDraft();

    console.log("currentFormation : " + currentFormation);
    if(currentFormation.length !== constants.NUMBER_OF_FORMATION) {
        throw "[Draft] Error while updating draft.";
    }
    console.log("done");

    await Draft.findOneAndUpdate({id : param.draftId}, {status : 'in_progress', currentFormation : currentFormationId})
        .exec(function (err, update) {
            if(err) {
                throw "[Draft] Error while updating draft.";
            }
            return currentFormation;
        });
}
