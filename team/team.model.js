const mongoose = require('mongoose');

var teamSchema = mongoose.Schema({
    userId : {type: mongoose.Schema.Types.ObjectId, ref : 'User', required: true, unique: true},
    formation: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Formation',
        required : true,
    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Player',
        required : true,
    }],
    team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Player',
    }],
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

teamSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Team', teamSchema);
