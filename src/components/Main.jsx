import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherData, fetchForecastData } from '../store/weatherSlice'; 
import WeatherInfo from './WeatherInfo';
import Loading from './Loading';
import Error from './Error';
import useGeolocation from '../hooks/useGeolocation';
import DailyForecast from './DailyForecast'; 
import CitySelector from './CitySelector';
import { cities } from '../constants';  // ایمپورت لیست شهرها از فایل constants.js

const Main = () => {
  const dispatch = useDispatch();
  const { data, forecast, loading: weatherLoading, error: weatherError } = useSelector((state) => state.weather);
  const { coords, error: geoError, loading: geoLoading } = useGeolocation();

  const [selectedCity, setSelectedCity] = useState(null);  // ذخیره شهر انتخاب شده

  useEffect(() => {
    if (coords) {
      dispatch(fetchWeatherData(coords));
      dispatch(fetchForecastData(coords));
    }
  }, [dispatch, coords]);

  // تابع تغییر شهر
  const handleCityChange = (event) => {
    const selected = cities.find(city => city.name === event.target.value);
    if (selected) {
      setSelectedCity(selected);
      dispatch(fetchWeatherData({ lat: selected.lat, lon: selected.lon }));
      dispatch(fetchForecastData({ lat: selected.lat, lon: selected.lon }));
    }
  };

  if (geoLoading || weatherLoading) return <Loading />;
  if (geoError || weatherError) return <Error message={geoError || weatherError} />;

  return (
    <div>
      {/* دکمه برای دریافت موقعیت مکانی کاربر */}
      <div>
        <button onClick={() => dispatch(fetchWeatherData(coords))}>Get My Location</button>
      </div>

      {/* استفاده از کامپوننت CitySelector */}
      <CitySelector handleCityChange={handleCityChange} />

      {/* نمایش اطلاعات آب و هوا */}
      {data && <WeatherInfo data={data} />}
      {forecast && <DailyForecast forecast={forecast} />}
    </div>
  );
};

export default Main;
