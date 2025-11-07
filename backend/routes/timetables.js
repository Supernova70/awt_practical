const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');

// GET /api/timetables?subjectId=
router.get('/', async (req, res) => {
  try {
    const { subjectId } = req.query;
    if (!subjectId) return res.status(400).json({ error: 'subjectId query parameter required' });

    const entries = await Timetable.find({ subject: subjectId }).populate('subject').lean();
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
