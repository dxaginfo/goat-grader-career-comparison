import { configureStore } from '@reduxjs/toolkit';
import playersReducer from './playersSlice';
import comparisonReducer from './comparisonSlice';

export const store = configureStore({
  reducer: {
    players: playersReducer,
    comparison: comparisonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
