// backend/beertasting-app/backend/models/beer.model.js

const mongoose = require('mongoose');

const beerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brewery: { type: String, required: true },
  style: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Beer', beerSchema);