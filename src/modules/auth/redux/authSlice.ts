import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../types/auth.types';
import { sendOTPThunk, verifyOTPThunk } from './authThunk';

const initialState: AuthState = {
  loading: false,
  isAuthenticated: false,
  firebaseToken: null,
  jwtToken: null,
  phoneNumber: '',
  confirmation: null,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    logout(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.firebaseToken = null;
      state.jwtToken = null;
      state.phoneNumber = '';
      state.confirmation = null;
      state.user = null;
      state.error = null;
    },

    clearError(state) {
      state.error = null;
    },

    saveJWT(state, action: PayloadAction<string>) {
      state.jwtToken = action.payload;
      state.isAuthenticated = true;
    },
  },

  extraReducers: builder => {
    builder

      // -----------------------------
      // Send OTP
      // -----------------------------

      .addCase(sendOTPThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(sendOTPThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.phoneNumber = action.payload.phoneNumber;
        state.confirmation = action.payload.confirmation;
        state.error = null;
      })

      .addCase(sendOTPThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // -----------------------------
      // Verify OTP + Backend Login
      // -----------------------------

      .addCase(verifyOTPThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyOTPThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.firebaseToken =
          action.payload.firebaseToken;

        state.jwtToken =
          action.payload.jwtToken;

        state.user =
          action.payload.user;

        state.isAuthenticated = true;

        state.error = null;
      })

      .addCase(verifyOTPThunk.rejected, (state, action) => {
        state.loading = false;

        state.isAuthenticated = false;

        state.error =
          action.payload as string;
      });
  },
});

export const {
  logout,
  clearError,
  saveJWT,
} = authSlice.actions;

export default authSlice.reducer;