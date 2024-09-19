const mongoose = require('mongoose');

const TownSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Town', TownSchema);
