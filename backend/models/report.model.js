const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({ //carpark, report, user, timestamp, status
  carpark: { type: String, required: true },
  report: { type: String, required: true },
  user: { type: String, required: true },
  status: { type: String, required: true },
}, {
  timestamps: true,
});

const Report = mongoose.model('Report', userSchema);

module.exports = Report;