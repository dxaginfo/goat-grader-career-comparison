// Mock data for demonstration
const MOCK_PLAYERS = [
  { id: 1, name: 'Michael Jordan', team: 'Chicago Bulls', position: 'SG', jerseyNumber: '23', yearStart: 1984, yearEnd: 2003 },
  { id: 2, name: 'LeBron James', team: 'Los Angeles Lakers', position: 'SF', jerseyNumber: '23', yearStart: 2003, yearEnd: 2023 },
  { id: 3, name: 'Kobe Bryant', team: 'Los Angeles Lakers', position: 'SG', jerseyNumber: '24', yearStart: 1996, yearEnd: 2016 },
  { id: 4, name: 'Magic Johnson', team: 'Los Angeles Lakers', position: 'PG', jerseyNumber: '32', yearStart: 1979, yearEnd: 1996 },
  { id: 5, name: 'Larry Bird', team: 'Boston Celtics', position: 'SF', jerseyNumber: '33', yearStart: 1979, yearEnd: 1992 },
  { id: 6, name: 'Kareem Abdul-Jabbar', team: 'Los Angeles Lakers', position: 'C', jerseyNumber: '33', yearStart: 1969, yearEnd: 1989 },
  { id: 7, name: 'Wilt Chamberlain', team: 'Philadelphia 76ers', position: 'C', jerseyNumber: '13', yearStart: 1959, yearEnd: 1973 },
  { id: 8, name: 'Bill Russell', team: 'Boston Celtics', position: 'C', jerseyNumber: '6', yearStart: 1956, yearEnd: 1969 },
  { id: 9, name: 'Tim Duncan', team: 'San Antonio Spurs', position: 'PF', jerseyNumber: '21', yearStart: 1997, yearEnd: 2016 },
  { id: 10, name: 'Shaquille O\'Neal', team: 'Los Angeles Lakers', position: 'C', jerseyNumber: '34', yearStart: 1992, yearEnd: 2011 },
];

// Mock player stats
const MOCK_STATS = {
  1: { // Michael Jordan
    career: { ppg: 30.1, rpg: 6.2, apg: 5.3, spg: 2.3, bpg: 0.8, fgp: 49.7, tpp: 32.7, ftp: 83.5 },
    regularSeason: [/* Would contain season-by-season data */],
    playoffs: [/* Would contain playoff data */]
  },
  2: { // LeBron James
    career: { ppg: 27.0, rpg: 7.4, apg: 7.4, spg: 1.6, bpg: 0.8, fgp: 50.4, tpp: 34.4, ftp: 73.4 },
    regularSeason: [/* Would contain season-by-season data */],
    playoffs: [/* Would contain playoff data */]
  },
  // Other players would have similar data structure
};

// Mock player achievements
const MOCK_ACHIEVEMENTS = {
  1: { // Michael Jordan
    championships: 6,
    mvps: 5,
    allStar: 14,
    allNba: 11,
    allDefense: 9,
    scoringTitles: 10,
    dpoy: 1
  },
  2: { // LeBron James
    championships: 4,
    mvps: 4,
    allStar: 19,
    allNba: 19,
    allDefense: 6,
    scoringTitles: 1,
    dpoy: 0
  },
  // Other players would have similar data structure
};

// Search for players by name or team
exports.searchPlayers = (req, res) => {
  try {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    
    const results = MOCK_PLAYERS.filter(player => 
      player.name.toLowerCase().includes(query) || 
      player.team.toLowerCase().includes(query)
    );
    
    res.json(results);
  } catch (error) {
    console.error('Error searching players:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get player details by ID
exports.getPlayerById = (req, res) => {
  try {
    const playerId = parseInt(req.params.id);
    const player = MOCK_PLAYERS.find(p => p.id === playerId);
    
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    
    res.json(player);
  } catch (error) {
    console.error('Error getting player:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get player statistics
exports.getPlayerStats = (req, res) => {
  try {
    const playerId = parseInt(req.params.id);
    const stats = MOCK_STATS[playerId];
    
    if (!stats) {
      return res.status(404).json({ message: 'Player stats not found' });
    }
    
    res.json(stats);
  } catch (error) {
    console.error('Error getting player stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get player achievements
exports.getPlayerAchievements = (req, res) => {
  try {
    const playerId = parseInt(req.params.id);
    const achievements = MOCK_ACHIEVEMENTS[playerId];
    
    if (!achievements) {
      return res.status(404).json({ message: 'Player achievements not found' });
    }
    
    res.json(achievements);
  } catch (error) {
    console.error('Error getting player achievements:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
