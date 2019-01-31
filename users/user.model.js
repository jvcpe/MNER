const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: { type: String, unique: true, required: true },
    pseudo: { type: String, unique: true, required: true },
    role: { type: String, default: 'user', required: true },
    hash: { type: String, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);
