import { weatherReducer, initialState } from '../../hooks/weatherReducer';

describe('weatherReducer', () => {
  it('should set location when SET_LOCATION is dispatched', () => {
    const action = {
      type: 'SET_LOCATION',
      payload: { lat: 52.52, lon: 13.405 },
    };

    const newState = weatherReducer(initialState, action);

    expect(newState.location.lat).toBe(52.52);
    expect(newState.location.lon).toBe(13.405);
  });

  it('should set weather data when SET_WEATHER_DATA is dispatched', () => {
    const action = {
      type: 'SET_WEATHER_DATA',
      payload: { name: 'Berlin', main: { temp: 20 } },
    };

    const newState = weatherReducer(initialState, action);

    expect(newState.weatherData.name).toBe('Berlin');
    expect(newState.weatherData.main.temp).toBe(20);
  });

  it('should set error when SET_ERROR is dispatched', () => {
    const action = {
      type: 'SET_ERROR',
      payload: 'Error fetching data',
    };

    const newState = weatherReducer(initialState, action);

    expect(newState.error).toBe('Error fetching data');
  });

  it('should set selected city when SET_SELECTED_CITY is dispatched', () => {
    const action = {
      type: 'SET_SELECTED_CITY',
      payload: 'London',
    };

    const newState = weatherReducer(initialState, action);

    expect(newState.selectedCity).toBe('London');
  });

  it('should return the initial state when unknown action is dispatched', () => {
    const action = { type: 'UNKNOWN_ACTION' };

    const newState = weatherReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
