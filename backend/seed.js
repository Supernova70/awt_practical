const mongoose = require('mongoose');
require('dotenv').config();

const Subject = require('./models/Subject');
const Timetable = require('./models/Timetable');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/timetable';

async function seed() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB for seeding');

  await Subject.deleteMany({});
  await Timetable.deleteMany({});

  const subjects = await Subject.insertMany([
    { name: 'Data Structures', code: 'BTCS301', description: 'Trees, Graphs, Lists' },
    { name: 'Databases', code: 'BTCS302', description: 'Relational and NoSQL' },
    { name: 'AWT', code: 'BTCS305', description: 'Advance web technologies' },
    { name: 'Software engineering ', code: 'BTCS307', description: 'Software engineering' },
    { name: 'DAA ', code: 'BTCS308', description: 'Design and Analysis of Algorithms' }
  ]);

  const ds = subjects.find(s => s.code === 'BTCS301');
  const db = subjects.find(s => s.code === 'BTCS302');
  const awt = subjects.find(s => s.code === 'BTCS305');
  const se = subjects.find(s => s.code === 'BTCS307');
  const daa = subjects.find(s => s.code === 'BTCS308');

  await Timetable.insertMany([
    { subject: ds._id, day: 'Monday', start: '09:00', end: '10:30', location: 'Room A' },
    { subject: ds._id, day: 'Wednesday', start: '09:00', end: '10:30', location: 'Room A' },
    { subject: db._id, day: 'Tuesday', start: '11:00', end: '12:30', location: 'Room B' },
    { subject: se._id, day: 'Thursday', start: '14:00', end: '15:30', location: 'Room C' },
    { subject: daa._id, day: 'Friday', start: '10:00', end: '11:30', location: 'Room D' },
    { subject: daa._id, day: 'Monday', start: '10:00', end: '11:30', location: 'Room D' },

  ]);

  console.log('Seed data inserted');
  mongoose.disconnect();
}

seed().catch(err => {
  console.error('Seeding error:', err);
  process.exit(1);
});
