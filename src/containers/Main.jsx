import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData, fetchForecastData } from '../store/weatherSlice';
import WeatherInfo from './WeatherInfo';
import Loading from '../components/Loading';
import Error from '../components/Error';
import useGeolocation from '../hooks/useGeolocation';
import DailyForecast from './DailyForecast';
import CitySelector from './CitySelector';
import { cities } from '../constants';

const Main = () => {
  const dispatch = useDispatch();
  const {
    data,
    forecast,
    loading: weatherLoading,
    error: weatherError,
  } = useSelector((state) => state.weather);
  const { coords, error: geoError, loading: geoLoading } = useGeolocation();

  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    if (coords && !selectedCity) {
      dispatch(fetchWeatherData(coords));
      dispatch(fetchForecastData(coords));
    }
  }, [dispatch, coords, selectedCity]);

  const handleCityChange = (event) => {
    const selected = cities.find(city => city.name === event.target.value);
    if (selected) {
      setSelectedCity(selected);
      dispatch(fetchWeatherData({ lat: selected.lat, lon: selected.lon }));
      dispatch(fetchForecastData({ lat: selected.lat, lon: selected.lon }));
    }
  };

  const handleGetLocation = () => {
    if (coords) {
      dispatch(fetchWeatherData(coords));
      dispatch(fetchForecastData(coords));
    } else {
      console.error('Error: Could not get location.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 text-white p-6">
      {/* پیام خطا و انتخاب شهر */}
      {geoError && (
        <div className="mb-4">
          <Error message={geoError} />
          <p className="text-lg">Please select a city manually:</p>
        </div>
      )}

      {/* دکمه دریافت موقعیت مکانی کاربر */}
      <div className="mb-6">
        <button 
          onClick={handleGetLocation} 
          className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-6 rounded-full shadow-lg transition-all duration-300"
        >
          Get My Location
        </button>
      </div>

      {/* نمایش CitySelector */}
      <div className="mb-6">
        <CitySelector handleCityChange={handleCityChange} />
      </div>

      {/* نمایش اطلاعات آب و هوا */}
      {weatherLoading && <Loading />}
      
      {data && (
        <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg mb-6 backdrop-filter backdrop-blur-lg">
          <WeatherInfo data={data} />
        </div>
      )}

      {forecast && (
        <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg">
          <DailyForecast forecast={forecast} />
        </div>
      )}
    </div>
  );
};

export default Main;
