import React from 'react';

const DailyForecast = ({ forecast }) => {
  if (!forecast || forecast.length === 0) {
    return <p>No forecast data available.</p>; // در صورتی که داده موجود نباشد
  }

  return (
    <div>
      <h2>5-Day Weather Forecast</h2>
      <ul>
        {forecast.map((day, index) => (
          <li key={index} style={{ marginBottom: '10px',display:"flex" }}>
            <h3>{new Date(day.dt * 1000).toLocaleDateString()}</h3>
            <p>Temperature: {day.main.temp}°C</p>
            <p>Condition: {day.weather[0].description}</p>
            <p>Humidity: {day.main.humidity}%</p>
            <p>Wind Speed: {day.wind.speed} m/s</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyForecast;
