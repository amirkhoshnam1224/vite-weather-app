import React from 'react';

const WeatherInfo = React.memo(({ weatherData }) => {
  if (!weatherData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Location: {weatherData.name}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Weather: {weatherData.weather[0].description}</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
    </div>
  );
});

export default WeatherInfo;
