// src/__tests__/store/weatherSlice.test.js
import weatherReducer, { fetchWeatherData, fetchForecastData } from '../../store/weatherSlice';
import axiosInstance from '../../api/axiosInstance'; 
jest.mock('../utils/axiosInstance');
describe('weatherSlice', () => {
  const initialState = {
    data: null,
    forecast: null,
    loading: false,
    error: null,
  };
  test('should handle initial state', () => {
    expect(weatherReducer(undefined, {})).toEqual(initialState);
  });
  test('should handle fetchWeatherData pending', () => {
    const action = fetchWeatherData.pending();
    const state = weatherReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
  test('should handle fetchWeatherData fulfilled', async () => {
    const mockResponse = { temperature: 20 };
    axiosInstance.get.mockResolvedValueOnce({ data: mockResponse }); // Mock پاسخ axios

    const action = await fetchWeatherData.fulfilled(mockResponse, '', { lat: 0, lon: 0 });
    const state = weatherReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.data).toEqual(mockResponse);
  });
  test('should handle fetchWeatherData rejected', async () => {
    const action = fetchWeatherData.rejected({ message: 'Error' });
    const state = weatherReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error');
  });
  test('should handle fetchForecastData pending', () => {
    const action = fetchForecastData.pending();
    const state = weatherReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });
  test('should handle fetchForecastData fulfilled', async () => {
    const mockResponse = { forecast: [] };
    axiosInstance.get.mockResolvedValueOnce({ data: mockResponse }); // Mock پاسخ axios

    const action = await fetchForecastData.fulfilled(mockResponse, '', { lat: 0, lon: 0 });
    const state = weatherReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.forecast).toEqual(mockResponse);
  });
  test('should handle fetchForecastData rejected', async () => {
    const action = fetchForecastData.rejected({ message: 'Error' });
    const state = weatherReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error');
  });
});
