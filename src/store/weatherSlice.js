// store/weatherSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherDataApi, fetchForecastDataApi } from '../api/weatherApi';

// Thunk برای گرفتن داده‌های پیش‌بینی 5 روز آینده
export const fetchForecastData = createAsyncThunk(
  'weather/fetchForecastData',
  async ({ lat, lon }) => {
    const response = await fetchForecastDataApi(lat, lon);
    return response;
  }
);

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async ({ lat, lon }) => {
    const response = await fetchWeatherDataApi(lat, lon);
    return response;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: null,
    forecast: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchForecastData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchForecastData.fulfilled, (state, action) => {
        state.loading = false;
        state.forecast = action.payload;
      })
      .addCase(fetchForecastData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
