import React, { useEffect } from 'react';
import useWeatherData from '../hooks/useWeatherDate';
import WeatherInfo from './WeatherInfo';
import cities from '../Datas';
import DailyForecast from './DailyForecast';

const Main = () => {
    const { state, dispatch, fetchWeatherData } = useWeatherData();

    useEffect(() => {
        if (state.selectedCity === 'current') {
            navigator.geolocation.getCurrentPosition((position) => {
                const coords = { lat: position.coords.latitude, lon: position.coords.longitude };
                dispatch({ type: 'SET_LOCATION', payload: coords });
                fetchWeatherData(coords.lat, coords.lon);
            });
        } else {
            const city = cities.find(city => city.name === state.selectedCity);
            if (city) {
                dispatch({ type: 'SET_LOCATION', payload: { lat: city.lat, lon: city.lon } });
                fetchWeatherData(city.lat, city.lon);
            }
        }
    }, [state.selectedCity]);

    if (state.error) {
        return <div>{state.error}</div>;
    }

    if (!state.weatherData) {
        return <div>Loading...</div>;
    }

    return (
        <main>
            <select onChange={(e) => dispatch({ type: 'SET_SELECTED_CITY', payload: e.target.value })} value={state.selectedCity}>
                <option value="current">Current Location</option>
                {cities.map(city => (
                    <option key={city.name} value={city.name}>{city.name}</option>
                ))}
            </select>
            <WeatherInfo weatherData={state.weatherData} />
            {state.location.lat && state.location.lon && (
                <DailyForecast lat={state.location.lat} lon={state.location.lon} />
            )}
        </main>
    );
};

export default Main;
