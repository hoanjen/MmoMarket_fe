import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/user.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
