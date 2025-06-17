const { OpenAI } = require('openai');

// Initialize OpenAI client if API key is available
let openai;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// Mock player data for demonstration
const MOCK_PLAYERS = {
  1: { name: 'Michael Jordan', team: 'Chicago Bulls' },
  2: { name: 'LeBron James', team: 'Los Angeles Lakers' },
  3: { name: 'Kobe Bryant', team: 'Los Angeles Lakers' },
  // More players would be defined here
};

// Mock statistics for demonstration
const MOCK_STATS = {
  1: { ppg: 30.1, rpg: 6.2, apg: 5.3, spg: 2.3, bpg: 0.8, fgp: 49.7, tpp: 32.7, ftp: 83.5 },
  2: { ppg: 27.0, rpg: 7.4, apg: 7.4, spg: 1.6, bpg: 0.8, fgp: 50.4, tpp: 34.4, ftp: 73.4 },
  3: { ppg: 25.0, rpg: 5.2, apg: 4.7, spg: 1.4, bpg: 0.5, fgp: 44.7, tpp: 32.9, ftp: 83.7 },
  // More stats would be defined here
};

// Mock achievements for demonstration
const MOCK_ACHIEVEMENTS = {
  1: { championships: 6, mvps: 5, allStar: 14, allNba: 11, allDefense: 9, scoringTitles: 10 },
  2: { championships: 4, mvps: 4, allStar: 19, allNba: 19, allDefense: 6, scoringTitles: 1 },
  3: { championships: 5, mvps: 1, allStar: 18, allNba: 15, allDefense: 12, scoringTitles: 2 },
  // More achievements would be defined here
};

// Generate a comparison between multiple players
exports.generateComparison = async (req, res) => {
  try {
    const { playerIds, criteria } = req.body;
    
    if (!playerIds || !Array.isArray(playerIds) || playerIds.length < 2) {
      return res.status(400).json({ message: 'At least two player IDs are required' });
    }
    
    // Gather player data for comparison
    const players = playerIds.map(id => {
      return {
        id,
        info: MOCK_PLAYERS[id] || { name: `Player ${id}`, team: 'Unknown' },
        stats: MOCK_STATS[id] || {},
        achievements: MOCK_ACHIEVEMENTS[id] || {}
      };
    });
    
    // Generate analysis text
    let analysisText;
    
    if (openai) {
      // Use OpenAI to generate analysis if API key is available
      const playerDetails = players.map(p => `${p.info.name} (${p.info.team}): ` + 
        `PPG: ${p.stats.ppg}, RPG: ${p.stats.rpg}, APG: ${p.stats.apg}, ` + 
        `Championships: ${p.achievements.championships}, MVPs: ${p.achievements.mvps}`);
      
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are an expert basketball analyst specializing in NBA player comparisons. Provide detailed, stat-based analysis comparing the careers of NBA players."
          },
          {
            role: "user",
            content: `Compare the following NBA players in detail, focusing on their statistical achievements, impact, and legacy:\n\n${playerDetails.join('\n\n')}\n\nProvide analysis on their playing styles, statistical strengths and weaknesses, playoff performances, and historical ranking. Consider their era of play when making comparisons.`
          }
        ],
        max_tokens: 800
      });
      
      analysisText = response.choices[0].message.content;
    } else {
      // Use mock analysis if OpenAI API key is not available
      const playerNames = players.map(p => p.info.name).join(' and ');
      analysisText = `Comparing the careers of ${playerNames} reveals interesting patterns in their statistical impact and championship success. ` +
        `This analysis would be more detailed with the OpenAI integration enabled.`;
    }
    
    // Prepare the comparison result
    const result = {
      players: players.map(p => ({ id: p.id, name: p.info.name, team: p.info.team })),
      analysis: analysisText,
      stats: Object.fromEntries(players.map(p => [p.id, p.stats])),
      achievements: Object.fromEntries(players.map(p => [p.id, p.achievements])),
      criteria: criteria || {}
    };
    
    res.json(result);
  } catch (error) {
    console.error('Error generating comparison:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
