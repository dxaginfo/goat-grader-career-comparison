const express = require('express');
const comparisonController = require('../controllers/comparisonController');

const router = express.Router();

// Generate a comparison between multiple players
router.post('/generate', comparisonController.generateComparison);

module.exports = router;
