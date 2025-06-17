import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const api = {
  // Player endpoints
  searchPlayers: (query: string) => {
    return axios.get(`${API_BASE_URL}/players/search`, { params: { q: query } });
  },
  getPlayerDetails: (playerId: number) => {
    return axios.get(`${API_BASE_URL}/players/${playerId}`);
  },
  getPlayerStats: (playerId: number) => {
    return axios.get(`${API_BASE_URL}/players/${playerId}/stats`);
  },
  getPlayerAchievements: (playerId: number) => {
    return axios.get(`${API_BASE_URL}/players/${playerId}/achievements`);
  },
  
  // Comparison endpoints
  generateComparison: (playerIds: number[], criteria: any) => {
    return axios.post(`${API_BASE_URL}/comparison/generate`, { playerIds, criteria });
  },
  
  // In a real app, we would add more endpoints for specific data needs
};
