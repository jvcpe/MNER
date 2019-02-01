const config = require('config.json');
const mongoose = require('mongoose');

//Database connection
mongoose.connect(config.connectionString).then(() => {
    console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
});
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    League : require('../league/league.model'),
    Player : require('../player/player.model'),
};
