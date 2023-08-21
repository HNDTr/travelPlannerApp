import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import itineraryReducer from '../features/itineraries/itinerarySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    itineraries: itineraryReducer
  },
});
