const mongoose = require('mongoose');

const TimetableSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  day: { type: String, required: true },
  start: { type: String, required: true },
  end: { type: String, required: true },
  location: { type: String }
});

module.exports = mongoose.model('Timetable', TimetableSchema);
