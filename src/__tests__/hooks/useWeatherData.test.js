import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import useWeatherData from '../../hooks/useWeatherDate';
import axios from 'axios';

// Mock axios
jest.mock('axios');

// Test component to use the hook
const TestComponent = () => {
  const { state, dispatch, fetchWeatherData } = useWeatherData();

  return (
    <div>
      <button onClick={() => fetchWeatherData(52.52, 13.405)}>Fetch Weather</button>
      {state.error && <p>{state.error}</p>}
      {state.weatherData ? (
        <div>
          <p>{`Location: ${state.weatherData.name}`}</p>
          <p>{`Temperature: ${state.weatherData.main.temp}`}</p>
        </div>
      ) : (
        <p>No weather data</p>
      )}
    </div>
  );
};

test('fetches and displays weather data', async () => {
  const weatherMock = {
    data: {
      name: 'Berlin',
      main: { temp: 20 },
      weather: [{ description: 'Clear sky' }],
      wind: { speed: 3.5 }
    }
  };

  // Mock the axios response
  axios.get.mockResolvedValueOnce(weatherMock);

  render(<TestComponent />);

  // Verify no data initially
  expect(screen.getByText(/No weather data/i)).toBeInTheDocument();

  // Trigger fetching weather data
  fireEvent.click(screen.getByText(/Fetch Weather/i));

  // Wait for the data to appear
  await waitFor(() => expect(screen.getByText(/Berlin/i)).toBeInTheDocument());
  expect(screen.getByText(/Temperature: 20/i)).toBeInTheDocument();
});

test('displays error message on API failure', async () => {
  const errorMessage = 'Error fetching weather data: Network Error';
  
  // Mock the axios response to reject
  axios.get.mockRejectedValueOnce(new Error('Network Error'));

  render(<TestComponent />);

  // Trigger fetching weather data
  fireEvent.click(screen.getByText(/Fetch Weather/i));

  // Wait for the error to appear
  await waitFor(() => expect(screen.getByText(errorMessage)).toBeInTheDocument());
});
