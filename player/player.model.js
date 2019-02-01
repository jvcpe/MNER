const mongoose = require('mongoose');

var playerSchema = mongoose.Schema({
    ID: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    nationality: {
        type: String,
        required: true,
    },
    nationality_flag: {
        type: String,
    },
    league: {
        type: String,
    },
    club: {
        type: String,
    },
    club_logo: {
        type: String,
    },
    fav_position: {
        type: String,
        enum: ["ST", "CF", "RF", "LF", "RW", "LW", "CM", "RM", "LM", "CAM", "CDM", "CB", "RB", "LB", "RWB", "LWB", "GK"],
        required: true,
    },
    position: [{
        type: String,
        enum: ["ST", "CF", "RF", "LF", "RW", "LW", "CM", "RM", "LM", "CAM", "CDM", "CB", "RB", "LB", "RWB", "LWB", "GK", ""],
    }]
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

playerSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Player', playerSchema);
