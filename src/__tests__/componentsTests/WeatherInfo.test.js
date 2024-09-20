import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherInfo from '../../components/WeatherInfo'; 

test('renders loading state when no weather data is provided', () => {
  render(<WeatherInfo weatherData={null} />);
  
  // بررسی می‌کنیم که متن "Loading weather information..." نمایش داده شود
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
});

test('renders weather information correctly when data is provided', () => {
  const mockWeatherData = {
    name: 'Berlin',
    main: { temp: 20, humidity: 60 },
    weather: [{ description: 'clear sky' }],
    wind: { speed: 5 },
  };

  render(<WeatherInfo weatherData={mockWeatherData} />);

  // بررسی می‌کنیم که اطلاعات به درستی رندر شده باشد
  expect(screen.getByText(/Location: Berlin/i)).toBeInTheDocument();
  expect(screen.getByText(/Temperature: 20°C/i)).toBeInTheDocument();
  expect(screen.getByText(/Weather: clear sky/i)).toBeInTheDocument();
  expect(screen.getByText(/Humidity: 60%/i)).toBeInTheDocument();
  expect(screen.getByText(/Wind Speed: 5 m\/s/i)).toBeInTheDocument();
});
