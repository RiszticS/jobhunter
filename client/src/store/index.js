import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import { api } from '../services/api'; // Import the API

export const store = configureStore({
  reducer: {
    user: userReducer,
    [api.reducerPath]: api.reducer, // Add the API reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // Add the API middleware
});
