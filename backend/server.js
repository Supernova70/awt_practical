const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const subjectsRouter = require('./routes/subjects');
const timetablesRouter = require('./routes/timetables');

const app = express();
app.use(cors());
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/timetable';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Mongo connection error:', err));

app.use('/api/subjects', subjectsRouter);
app.use('/api/timetables', timetablesRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
