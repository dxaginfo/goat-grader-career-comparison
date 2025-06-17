import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../services/api';

export interface Player {
  id: number;
  name: string;
  team: string;
  position?: string;
  imageUrl?: string;
  jerseyNumber?: string;
  yearStart?: number;
  yearEnd?: number;
}

interface PlayersState {
  players: Player[];
  searchResults: Player[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: PlayersState = {
  players: [],
  searchResults: [],
  status: 'idle',
  error: null,
};

export const searchPlayers = createAsyncThunk(
  'players/search',
  async (query: string) => {
    // In a real app, this would call the actual API
    // For now, simulate a delay and return mock data
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data for demonstration purposes
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
    
    // Filter results based on query
    return MOCK_PLAYERS.filter(player => 
      player.name.toLowerCase().includes(query.toLowerCase()) ||
      player.team.toLowerCase().includes(query.toLowerCase())
    );
  }
);

export const fetchPlayerDetails = createAsyncThunk(
  'players/fetchDetails',
  async (playerId: number) => {
    // In a real app, this would call the actual API
    // For now, simulate a delay and return mock data
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock player details
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
    
    const player = MOCK_PLAYERS.find(p => p.id === playerId);
    if (!player) {
      throw new Error('Player not found');
    }
    return player;
  }
);

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPlayers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchPlayers.fulfilled, (state, action: PayloadAction<Player[]>) => {
        state.status = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(searchPlayers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to search players';
      })
      .addCase(fetchPlayerDetails.fulfilled, (state, action: PayloadAction<Player>) => {
        const index = state.players.findIndex(p => p.id === action.payload.id);
        if (index >= 0) {
          state.players[index] = action.payload;
        } else {
          state.players.push(action.payload);
        }
      });
  },
});

export const { clearSearchResults } = playersSlice.actions;
export default playersSlice.reducer;
