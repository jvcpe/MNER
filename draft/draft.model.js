const mongoose = require('mongoose');

var draftSchema = mongoose.Schema({
    state : {type: String, enum: ['not_started', 'in_progress', 'done'], required: true, default: 'not_started'},
    userId : {type: mongoose.Schema.Types.ObjectId, ref : 'User', required: true, unique: true},
    league : {
        type: String,
        enum: ["Ligue 1", "Serie A", "Premier League"],
    },
    draftedFormation: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Formation',
    },
    currentFormation : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Formation'
    }],
    draftedPlayer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Player',
    }],
    currentDraw: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Player',
    }],
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

draftSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Draft', draftSchema);
