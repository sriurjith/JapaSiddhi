import {createAsyncThunk} from '@reduxjs/toolkit';
import HomeApi from '../services/homeApi';
import {HomeResponse} from '../types/home';

export const fetchHomeData = createAsyncThunk<
  HomeResponse,
  void,
  {
    rejectValue: string;
  }
>('home/fetchHomeData', async (_arg, {rejectWithValue}) => {
  try {
    return await HomeApi.getHomeData();
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message;
    return rejectWithValue(message || 'Could not load home counts from the API.');
  }
});