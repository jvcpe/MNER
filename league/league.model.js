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
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required: true,
    },
    user: {
        type: [mongoose.Schema.Types.ObjectId],
        ref : 'User',
        required: true,
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('League', leagueSchema);
