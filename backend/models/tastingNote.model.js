const mongoose = require('mongoose');

const tastingNoteSchema = new mongoose.Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  beer: { type: mongoose.Schema.Types.ObjectId, ref: 'Beer', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('TastingNote', tastingNoteSchema);