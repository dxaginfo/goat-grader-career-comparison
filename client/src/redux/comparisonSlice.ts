import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Player } from './playersSlice';
import { api } from '../services/api';

interface ComparisonCriteria {
  peakPerformance: boolean;
  longevity: boolean;
  playoffs: boolean;
  championships: boolean;
  statistics: boolean;
  eraAdjusted: boolean;
}

export interface ComparisonResult {
  analysis: string;
  charts: any[]; // This would be more structured in a real app
  playerStats: Record<number, any>; // Player ID to stats mapping
  playerAchievements: Record<number, any>; // Player ID to achievements mapping
}

interface ComparisonState {
  selectedPlayers: Player[];
  criteria: ComparisonCriteria;
  result: ComparisonResult | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ComparisonState = {
  selectedPlayers: [],
  criteria: {
    peakPerformance: true,
    longevity: true,
    playoffs: true,
    championships: true,
    statistics: true,
    eraAdjusted: true,
  },
  result: null,
  status: 'idle',
  error: null,
};

export const generateComparison = createAsyncThunk(
  'comparison/generate',
  async ({ playerIds, criteria }: { playerIds: number[], criteria: ComparisonCriteria }) => {
    // In a real app, this would call the API to generate the comparison
    // For now, simulate a delay and return mock data
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock result
    return {
      analysis: `This is a mock analysis comparing players with IDs ${playerIds.join(', ')}. 
                In a real app, this would be a detailed AI-generated analysis.`,
      charts: [],
      playerStats: {},
      playerAchievements: {},
    };
  }
);

const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<Player>) => {
      // Only add if not already selected
      if (!state.selectedPlayers.find(p => p.id === action.payload.id)) {
        state.selectedPlayers.push(action.payload);
      }
    },
    removePlayer: (state, action: PayloadAction<number>) => {
      state.selectedPlayers = state.selectedPlayers.filter(p => p.id !== action.payload);
    },
    clearSelectedPlayers: (state) => {
      state.selectedPlayers = [];
    },
    updateCriteria: (state, action: PayloadAction<Partial<ComparisonCriteria>>) => {
      state.criteria = { ...state.criteria, ...action.payload };
    },
    resetComparison: (state) => {
      state.result = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateComparison.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(generateComparison.fulfilled, (state, action: PayloadAction<ComparisonResult>) => {
        state.status = 'succeeded';
        state.result = action.payload;
      })
      .addCase(generateComparison.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to generate comparison';
      });
  },
});

export const { addPlayer, removePlayer, clearSelectedPlayers, updateCriteria, resetComparison } = comparisonSlice.actions;
export default comparisonSlice.reducer;
