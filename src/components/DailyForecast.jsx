import React, { useState, useEffect } from 'react';
import axios from 'axios';
const DailyForecast = React.memo(({ lat, lon }) => {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDailyForecast = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast`, {
            params: {
              lat,
              lon,
              appid: '222d90b4a36a08f635c2aff827c12d51',
              units: 'metric'
            }
          }
        );
        
        const dailyData = response.data.list.filter((_, index) => index % 8 === 0);
        setForecast(dailyData);
      } catch (error) {
        setError('Error fetching daily forecast: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    if (lat && lon) {
      fetchDailyForecast();
    }
  }, [lat, lon]);

  if (loading) {
    return <p>Loading forecast...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>5-Day Weather Forecast</h2>
      <ul>
        {forecast.map((day, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
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
});

export default DailyForecast;
