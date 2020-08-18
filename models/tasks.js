const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema ({
  key : { type: String, required: true},
  value: { type: String, required: true},
  timestamp: { type: Number}
});

module.exports = mongoose.model('Tasks', PetSchema);