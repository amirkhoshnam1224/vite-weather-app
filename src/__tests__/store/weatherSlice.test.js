import weatherReducer, { fetchWeatherData, fetchForecastData } from '../../store/weatherSlice';
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
  test('should handle fetchWeatherData fulfilled', () => {
    const action = fetchWeatherData.fulfilled({ temperature: 20 }, '', { lat: 0, lon: 0 });
    const state = weatherReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.data).toEqual({ temperature: 20 });
  });
  test('should handle fetchWeatherData rejected', () => {
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
  test('should handle fetchForecastData fulfilled', () => {
    const action = fetchForecastData.fulfilled({ forecast: [] }, '', { lat: 0, lon: 0 });
    const state = weatherReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.forecast).toEqual({ forecast: [] });
  });
  test('should handle fetchForecastData rejected', () => {
    const action = fetchForecastData.rejected({ message: 'Error' });
    const state = weatherReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error');
  });
});
