import {createAsyncThunk} from '@reduxjs/toolkit';
import HomeApi from '../services/homeApi';
import {HomeResponse} from '../types/home';

export const fetchHomeData = createAsyncThunk<
  HomeResponse,
  void,
  {
    rejectValue: string;
  }
>(
  'home/fetchHomeData',
  async (_, {rejectWithValue}) => {
    try {
      const response = await HomeApi.getHomeData();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Unable to load Home data.',
      );
    }
  },
);