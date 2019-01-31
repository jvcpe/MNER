const mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    league: {
        type: String,
        enum: ["ligue1", "liga", "premierleague", "bundesliga", "serie1"],
    },
    club: {
        type: String,
        enum: ["om", "ol", "psg", "asse", "asm", "fcb", "fcn","sr","ogcn","mhsc","dfco","eag","asc","asco","rcsa","smc","losc","tfc","sdr","no"]
    },
    fav_position: {
        type: String,
        enum: ["ST", "CF", "RF", "LF", "CM", "RM", "LM", "CAM", "CDM", "CB", "RB", "LB", "RWB", "LWB", "GK"],
        required: true,
    },
    position: [{
        type: String,
        enum: ["ST", "CF", "RF", "LF", "CM", "RM", "LM", "CAM", "CDM", "CB", "RB", "LB", "RWB", "LWB", "GK"],
        required: true,
    }]
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Player', playerSchema);
