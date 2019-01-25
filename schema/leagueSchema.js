const mongoose = require('mongoose');

var leagueSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
        default: "created",
        enum: ["created", "draft", "in_progress", "done"],
    },
    user: {
        type: [String],
    }
},{ timestamps: { createdAt: 'created_at' }});

module.exports = mongoose.model('League', leagueSchema);
