import React from 'react';
import { cities } from '../constants';  // لیست شهرها

const CitySelector = ({ handleCityChange }) => {
  return (
    <div>
      <label htmlFor="city-select">Select a City:</label>
      <select id="city-select" onChange={handleCityChange} defaultValue="">
        <option value="" disabled>Select a city</option>
        {cities.map(city => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelector;
