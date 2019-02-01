const db = require('_helpers/db');
const Draft = db.Draft;

module.exports = {
    getDraftByUserId,
};

async function getDraftByUserId(userId) {
    return Draft.findOne({userId});
}
