import axiosInstance from '../utils/axiosInstance';
export const fetchForecastDataApi = async (lat, lon) => {
  try {
    console.log('Fetching forecast data for:', lat, lon);
    const response = await axiosInstance.get('forecast', {
      params: {
        lat,
        lon,
      },
    });
    const dailyForecasts = response.data.list.filter(
      (forecast) => new Date(forecast.dt * 1000).getHours() === 12,
    );
    console.log('Filtered Daily Forecast:', dailyForecasts);
    return dailyForecasts;
  } catch (error) {
    console.error('Error fetching forecast data:', error.message);
  }
};
