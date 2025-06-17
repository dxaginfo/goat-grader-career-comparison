const express = require('express');
const playerController = require('../controllers/playerController');

const router = express.Router();

// Search for players by name or team
router.get('/search', playerController.searchPlayers);

// Get player details by ID
router.get('/:id', playerController.getPlayerById);

// Get player statistics
router.get('/:id/stats', playerController.getPlayerStats);

// Get player achievements
router.get('/:id/achievements', playerController.getPlayerAchievements);

module.exports = router;
