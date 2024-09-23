jest.mock('.././assets/sunny.svg', () => 'svg-mock');
jest.mock('.././assets/cloud.svg', () => 'svg-mock');
jest.mock('.././assets/rainy.svg', () => 'svg-mock');
import React from 'react';
import { render, screen } from '@testing-library/react';
import DailyForecast from '../../containers/DailyForecast';
describe('DailyForecast Component', () => {
  test('renders correctly with forecast data', () => {
    const mockForecast = [
      {
        dt: 1627845600,
        main: { temp: 25, humidity: 60 },
        weather: [{ description: 'clear sky' }],
        wind: { speed: 3.5 },
      },
      {
        dt: 1627932000,
        main: { temp: 28, humidity: 50 },
        weather: [{ description: 'partly cloudy' }],
        wind: { speed: 4.2 },
      },
    ];
    render(<DailyForecast forecast={mockForecast} />);
    expect(screen.getByText('5-Day Weather Forecast')).toBeInTheDocument();
    expect(screen.getByText(/Temperature: 25°C/)).toBeInTheDocument();
    expect(screen.getByText(/Condition: clear sky/)).toBeInTheDocument();
    expect(screen.getByText(/Wind Speed: 3.5 m\/s/)).toBeInTheDocument();
  });
  test('renders no forecast message when no data is available', () => {
    render(<DailyForecast forecast={[]} />);
    expect(screen.getByText('No forecast data available.')).toBeInTheDocument();
  });
});
