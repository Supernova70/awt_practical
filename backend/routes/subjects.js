const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');

// GET /api/subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find().lean();
    res.json(subjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
