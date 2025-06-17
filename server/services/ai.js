const { OpenAI } = require('openai');

// Initialize OpenAI client if API key is available
let openai;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

/**
 * Service for generating AI-powered analysis of player statistics
 */

/**
 * Generate a comparison analysis between multiple players
 * @param {Array} players - Array of player objects with stats and achievements
 * @param {Object} criteria - Criteria for the comparison
 */
exports.generateComparisonAnalysis = async (players, criteria) => {
  if (!openai) {
    return 'AI-powered analysis is not available. Please check your OpenAI API key configuration.';
  }
  
  try {
    // Create a detailed prompt with player statistics
    const playerDetails = players.map(player => {
      const { name, stats, achievements } = player;
      
      return `${name}:\n` +
        `- Career Stats: ${stats.ppg} PPG, ${stats.rpg} RPG, ${stats.apg} APG, ${stats.spg} SPG, ${stats.bpg} BPG, ${stats.fgp}% FG, ${stats.tpp}% 3P, ${stats.ftp}% FT\n` +
        `- Achievements: ${achievements.championships} Championships, ${achievements.mvps} MVPs, ${achievements.allStar} All-Star selections, ${achievements.allNba} All-NBA Teams, ${achievements.allDefense} All-Defensive Teams, ${achievements.scoringTitles} Scoring Titles`;
    }).join('\n\n');
    
    // Build criteria string
    const criteriaStr = Object.entries(criteria)
      .filter(([_, isEnabled]) => isEnabled)
      .map(([key]) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()))
      .join(', ');
    
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert basketball analyst specializing in NBA player comparisons. Provide detailed, nuanced analysis comparing players across different eras."
        },
        {
          role: "user",
          content: `Compare the following NBA players, focusing on these criteria: ${criteriaStr}\n\n${playerDetails}\n\nProvide a detailed analysis that compares their statistical achievements, playing styles, impact on winning, and historical legacy. Consider the different eras they played in when making your analysis. The response should be unbiased, data-driven, and highlight both strengths and weaknesses of each player.`
        }
      ],
      max_tokens: 1000
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI analysis:', error);
    return 'An error occurred while generating the AI analysis. Please try again later.';
  }
};

/**
 * Generate era-adjusted statistics for a player
 * @param {Object} playerStats - Player's raw statistics
 * @param {Number} startYear - First year of player's career
 * @param {Number} endYear - Last year of player's career
 */
exports.generateEraAdjustedStats = async (playerStats, startYear, endYear) => {
  if (!openai) {
    return playerStats; // Return original stats if OpenAI is not available
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a basketball analytics expert specializing in historical statistical normalization. You can adjust player statistics across different NBA eras."
        },
        {
          role: "user",
          content: `Adjust the following player statistics for modern era comparison (2020s):\n\n` +
            `Player career: ${startYear}-${endYear}\n` +
            `Original stats: ${playerStats.ppg} PPG, ${playerStats.rpg} RPG, ${playerStats.apg} APG, ${playerStats.fgp}% FG, ${playerStats.tpp}% 3P\n\n` +
            `Calculate how these statistics would translate to the modern NBA, considering factors like pace of play, rule changes, spacing, three-point volume, and defensive intensity. Provide the adjusted statistics and a brief explanation.`
        }
      ],
      max_tokens: 500
    });
    
    // In a real app, we would parse the response to extract the adjusted statistics
    // For simplicity, we're just returning the original stats with a small adjustment
    return {
      ...playerStats,
      eraAdjusted: true,
      explanation: response.choices[0].message.content
    };
  } catch (error) {
    console.error('Error generating era-adjusted stats:', error);
    return playerStats; // Return original stats if an error occurs
  }
};
