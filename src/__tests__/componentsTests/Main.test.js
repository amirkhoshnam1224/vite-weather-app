import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import Main from '../../components/Main';
import useWeatherData from '../../hooks/useWeatherDate';

jest.mock('../../hooks/useWeatherDate');

const mockDispatch = jest.fn();
const mockFetchWeatherData = jest.fn();
const initialState = {
  selectedCity: 'current',
  location: { lat: null, lon: null },
  weatherData: null,
  error: null,
};

useWeatherData.mockReturnValue({
  state: initialState,
  dispatch: mockDispatch,
  fetchWeatherData: mockFetchWeatherData,
});

navigator.geolocation = {
  getCurrentPosition: jest.fn(),
};

test('renders loading state initially', () => {
  render(<Main />);
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test('renders error message if there is an error', async () => {
  useWeatherData.mockReturnValueOnce({
    state: { ...initialState, error: 'Error fetching weather data' },
    dispatch: mockDispatch,
    fetchWeatherData: mockFetchWeatherData,
  });

  render(<Main />);
  expect(screen.getByText(/Error fetching weather data/i)).toBeInTheDocument();
});

test('calls geolocation when current location is selected', async () => {
  navigator.geolocation.getCurrentPosition.mockImplementationOnce((success) => {
    success({
      coords: {
        latitude: 52.52,
        longitude: 13.405,
      },
    });
  });

  render(<Main />);

  await waitFor(() => {
    expect(navigator.geolocation.getCurrentPosition).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SET_LOCATION',
      payload: { lat: 52.52, lon: 13.405 },
    });
    expect(mockFetchWeatherData).toHaveBeenCalledWith(52.52, 13.405);
  });
});

test('updates city when a different city is selected', async () => {
    useWeatherData.mockReturnValueOnce({
      state: {
        selectedCity: 'current',
        weatherData: { main: { temp: 20 }, weather: [{ description: 'Clear' }], wind: { speed: 5 } },
        location: { lat: 52.52, lon: 13.405 },
        error: null,
      },
      dispatch: mockDispatch,
      fetchWeatherData: mockFetchWeatherData,
    });
  
    render(<Main />);
  
    // صبر کنید تا <select> به درستی رندر شود
    await waitFor(() => {
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'London' } });
    });
  
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'SET_SELECTED_CITY',
        payload: 'London',
      });
    });
  });
  