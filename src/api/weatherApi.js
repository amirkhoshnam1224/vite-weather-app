// api/weatherApi.js
import axios from 'axios';

export const fetchWeatherDataApi = async (lat, lon) => {
  const response = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        lat,
        lon,
        appid: '222d90b4a36a08f635c2aff827c12d51',
        units: 'metric',
      },
    },
  );
  console.log('Api:', response.data);
  return response.data;
};

export const fetchForecastDataApi = async (lat, lon) => {
  try {
    console.log('Fetching forecast data for:', lat, lon);
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/forecast',
      {
        params: {
          lat,
          lon,
          appid: '222d90b4a36a08f635c2aff827c12d51',
          units: 'metric',
        },
      },
    );
    // فیلتر کردن داده‌ها تا از هر روز یک پیش‌بینی (ظهر) دریافت کنیم
    const dailyForecasts = response.data.list.filter(
      (forecast) => new Date(forecast.dt * 1000).getHours() === 12,
    );
    console.log('Filtered Daily Forecast:', dailyForecasts);
    return dailyForecasts;
  } catch (error) {
    console.error('Error fetching forecast data:', error.message);
  }
};
