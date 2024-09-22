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

  const [selectedCity, setSelectedCity] = useState(null); // ذخیره شهر انتخاب شده

  useEffect(() => {
    if (coords && !selectedCity) {
      dispatch(fetchWeatherData(coords));
      dispatch(fetchForecastData(coords));
    }
  }, [dispatch, coords, selectedCity]);

  // تابع تغییر شهر
  const handleCityChange = (event) => {
    const selected = cities.find(city => city.name === event.target.value);
    if (selected) {
      setSelectedCity(selected);
      dispatch(fetchWeatherData({ lat: selected.lat, lon: selected.lon }));
      dispatch(fetchForecastData({ lat: selected.lat, lon: selected.lon }));
    }
  };

  // دکمه دریافت موقعیت مکانی کاربر
  const handleGetLocation = () => {
    if (coords) {
      dispatch(fetchWeatherData(coords));
      dispatch(fetchForecastData(coords));
    } else {
      console.error('Error: Could not get location.');
    }
  };

  return (
    <div>
      {/* اگر لوکیشن کار نکند، پیام خطا به همراه امکان انتخاب شهر نمایش داده می‌شود */}
      {geoError && (
        <div>
          <Error message={geoError} />
          <p>Please select a city manually:</p>
        </div>
      )}

      {/* دکمه برای دریافت موقعیت مکانی کاربر */}
      <div>
        <button onClick={handleGetLocation}>Get My Location</button>
      </div>

      {/* همیشه نمایش کامپوننت CitySelector برای انتخاب شهر */}
      <CitySelector handleCityChange={handleCityChange} />

      {/* نمایش اطلاعات آب و هوا */}
      {weatherLoading && <Loading />}
      {data && <WeatherInfo data={data} />}
      {forecast && <DailyForecast forecast={forecast} />}
    </div>
  );
};

export default Main;
