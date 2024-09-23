import React from 'react';
import SunnyIcon from '.././assets/sunny.svg';
import CloudyIcon from '.././assets/cloud.svg';
import RainyIcon from '.././assets/rainy.svg';
const getWeatherIcon = (description) => {
  switch (description) {
    case 'clear sky':
      return <img src={CloudyIcon} alt="Sunny" className="w-12 h-12" />;
    case 'few clouds':
      return <img src={SunnyIcon} alt="Cloudy" className="w-12 h-12" />;
    case 'rain':
      return <img src={RainyIcon} alt="Rainy" className="w-12 h-12" />;
    default:
      return <img src={SunnyIcon} alt="Default Weather" className="w-12 h-12" />;
  }
};
const DailyForecast = ({ forecast }) => {
  if (!forecast || forecast.length === 0) {
    return <p className="text-center text-gray-500">No forecast data available.</p>; 
  }
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto mt-6">
      <h2 className="text-xl font-bold text-gray-700 mb-4">5-Day Weather Forecast</h2>
      <ul className="space-y-4">
        {forecast.map((day, index) => (
          <li key={index} className="flex flex-col space-y-2 bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-indigo-600">
                {new Date(day.dt * 1000).toLocaleDateString()}
              </h3>
              {getWeatherIcon(day.weather[0].description)}
            </div>
            <p className="text-gray-700">Temperature: {day.main.temp}°C</p>
            <p className="text-gray-700">Condition: {day.weather[0].description}</p>
            <p className="text-gray-700">Humidity: {day.main.humidity}%</p>
            <p className="text-gray-700">Wind Speed: {day.wind.speed} m/s</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyForecast;
