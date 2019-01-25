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
        enum: ["om", "ol", "psg", "asse", "asm", "fcb", "fcn"]
    },
    position: {
        type: [String],
        required: true,
    }
},{ timestamps: { createdAt: 'created_at' }});

module.exports = mongoose.model('Player', playerSchema);
