import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import clockReducer from './slices/clockSlice';
import tooltipReducer from './slices/tooltipSlice';

export const store = configureStore({
  reducer: {
    clock: clockReducer,
    tooltip: tooltipReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
