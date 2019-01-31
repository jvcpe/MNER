const mongoose = require('mongoose');

var draftSchema = mongoose.Schema({
    state : {type: String, enum: ['not_started', 'in_progress', 'done'], required: true, default: 'not_started'},
    draftedPlayer: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Player',
    }],
    currentDraw: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Player',
    }],
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Draft', draftSchema);
