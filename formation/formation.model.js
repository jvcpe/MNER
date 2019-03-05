const mongoose = require('mongoose');

var formationSchema = mongoose.Schema({
    name : {
        type : String,
        required: true,
    },
    position : [{
        type: String,
        enum: ["ST", "CF", "RF", "LF", "RW", "LW", "CM", "RM", "LM", "CAM", "CDM", "CB", "RB", "LB", "RWB", "LWB", "GK"],
        required: true,
    }],
    link : [[{
        type: Number,
        required: true,
    }]],
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

formationSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Formation', formationSchema);
