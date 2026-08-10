import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HomeResponse } from '../types/home';
import { fetchHomeData } from './homeThunk';

interface HomeState {
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  homeData: HomeResponse | null;
}

const initialState: HomeState = {
  loading: false,
  refreshing: false,
  error: null,
  homeData: null,
};

const homeSlice = createSlice({
  name: 'home',

  initialState,

  reducers: {
    clearHomeError(state) {
      state.error = null;
    },

    clearHomeData(state) {
      state.homeData = null;
    },

    updateGlobalJapaCount(
      state,
      action: PayloadAction<number>,
    ) {
      if (!state.homeData) {
        return;
      }

      state.homeData.globalJapaCount.totalCount =
        action.payload;
    },
  },

  extraReducers: builder => {
    builder

      .addCase(fetchHomeData.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchHomeData.fulfilled,
        (state, action: PayloadAction<HomeResponse>) => {
          state.loading = false;
          state.homeData = action.payload;
          state.error = null;
        },
      )

      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) ||
          'Unable to load home data.';
      });
  },
});

export const {
  clearHomeError,
  clearHomeData,
  updateGlobalJapaCount,
} = homeSlice.actions;

export default homeSlice.reducer;