import React from 'react';
import { cities } from '../constants';
const CitySelector = ({ handleCityChange }) => {
  return (
    <div className="flex flex-col space-y-2 w-full max-w-xs mx-auto font-sans">
      <label
        htmlFor="city-select"
        className="block text-sm font-medium text-gray-700"
      >
        Select a City:
      </label>
      <select
        id="city-select"
        onChange={handleCityChange}
        defaultValue=""
        className="text-black block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      >
        <option value="" disabled hidden>
          Please select a city
        </option>
        {(cities || []).map((city) => ( 
          <option className='text-black' key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelector;

