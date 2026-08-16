import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../modules/auth/redux/authSlice';
import homeReducer from '../modules/home/redux/homeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/sendOTP/fulfilled'],
        ignoredPaths: ['auth.confirmation'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;