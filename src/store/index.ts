import { configureStore } from '@reduxjs/toolkit';

import { tasksSlice, userSlice } from './slices';

export const store = configureStore({
  reducer: {
    userData: userSlice,
    tasksData: tasksSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
