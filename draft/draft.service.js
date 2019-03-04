const db = require('_helpers/db');
const Draft = db.Draft;

module.exports = {
    getDraftByUserId,
    createDraft,
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
    await user.save();
}
