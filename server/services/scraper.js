const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Service for scraping basketball statistics from public websites
 * 
 * Note: This is a placeholder implementation. In a production app,
 * this would include proper error handling, rate limiting, and caching.
 * It would also respect the website's robots.txt and terms of service.
 */

// Base URL for Basketball Reference
const BASE_URL = 'https://www.basketball-reference.com';

/**
 * Scrape a player's basic information and career stats
 * @param {string} playerUrlSlug - The URL slug for the player's page
 */
exports.scrapePlayerInfo = async (playerUrlSlug) => {
  try {
    const url = `${BASE_URL}/players/${playerUrlSlug.charAt(0)}/${playerUrlSlug}.html`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    // Extract basic info
    const name = $('h1[itemprop="name"]').text().trim();
    const position = $('[itemprop="name"]').next().text().split('▪')[0].trim();
    
    // Extract career stats from the table
    const careerStats = {};
    const careerRow = $('#per_game tbody tr.full_table').last();
    
    if (careerRow.length) {
      careerStats.ppg = parseFloat(careerRow.find('td[data-stat="pts_per_g"]').text()) || 0;
      careerStats.rpg = parseFloat(careerRow.find('td[data-stat="trb_per_g"]').text()) || 0;
      careerStats.apg = parseFloat(careerRow.find('td[data-stat="ast_per_g"]').text()) || 0;
      // More stats would be extracted here
    }
    
    return {
      name,
      position,
      stats: careerStats
    };
  } catch (error) {
    console.error('Error scraping player info:', error);
    throw error;
  }
};

/**
 * Search for players by name
 * @param {string} query - The search query
 */
exports.searchPlayers = async (query) => {
  try {
    const url = `${BASE_URL}/search/search.fcgi?search=${encodeURIComponent(query)}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    const players = [];
    
    // Extract player results
    $('.search-item-name').each((i, el) => {
      const link = $(el).find('a');
      const name = link.text().trim();
      const href = link.attr('href');
      
      if (href && href.includes('/players/')) {
        // Extract player ID from URL
        const urlParts = href.split('/');
        const playerUrlSlug = urlParts[urlParts.length - 1].replace('.html', '');
        
        players.push({
          name,
          urlSlug: playerUrlSlug
        });
      }
    });
    
    return players;
  } catch (error) {
    console.error('Error searching players:', error);
    throw error;
  }
};

/**
 * Scrape a player's season-by-season statistics
 * @param {string} playerUrlSlug - The URL slug for the player's page
 */
exports.scrapePlayerSeasonStats = async (playerUrlSlug) => {
  try {
    const url = `${BASE_URL}/players/${playerUrlSlug.charAt(0)}/${playerUrlSlug}.html`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    const seasonStats = [];
    
    // Extract season-by-season stats
    $('#per_game tbody tr:not(.thead)').each((i, el) => {
      const season = $(el).find('th[data-stat="season"]').text().trim();
      
      if (season && !season.includes('Career') && !season.includes('Season')) {
        const stats = {
          season,
          team: $(el).find('td[data-stat="team_id"]').text().trim(),
          age: parseInt($(el).find('td[data-stat="age"]').text()) || 0,
          ppg: parseFloat($(el).find('td[data-stat="pts_per_g"]').text()) || 0,
          rpg: parseFloat($(el).find('td[data-stat="trb_per_g"]').text()) || 0,
          apg: parseFloat($(el).find('td[data-stat="ast_per_g"]').text()) || 0,
          // More stats would be extracted here
        };
        
        seasonStats.push(stats);
      }
    });
    
    return seasonStats;
  } catch (error) {
    console.error('Error scraping player season stats:', error);
    throw error;
  }
};
