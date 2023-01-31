const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({ //carpark, report, user, timestamp, status
  carpark: { type: String, required: true },
  longlat: { type: String, required: true },
  facilities: { type: String, required: true },
  available: { type: Number, required: true },
}, {
  timestamps: true,
});

const Carpark = mongoose.model('Carpark', userSchema);

module.exports = Carpark;