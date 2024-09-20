import { useReducer } from 'react';
import axios from 'axios';
import { weatherReducer, initialState } from '../reducers/weatherReducer';

const useWeatherData = () => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat,
          lon,
          appid: '222d90b4a36a08f635c2aff827c12d51',
          units: 'metric',
        },
      });
      dispatch({ type: 'SET_WEATHER_DATA', payload: response.data });

      const weatherInfo = {
        location: response.data.name,
        temp: response.data.main.temp,
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        lastUpdated: new Date().toLocaleString(),
      };
      localStorage.setItem('weatherData', JSON.stringify(weatherInfo));
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Error fetching weather data: ' + error.message });
    }
  };

  return { state, dispatch, fetchWeatherData };
};

export default useWeatherData;
