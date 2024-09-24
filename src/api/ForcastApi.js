import axiosInstance from './axiosInstance';
export const fetchForecastDataApi = async (lat, lon) => {
  try {
    const response = await axiosInstance.get('forecast', {
      params: {
        lat,
        lon,
      },
    });
    const dailyForecasts = response.data.list.filter(
      (forecast) => new Date(forecast.dt * 1000).getHours() === 12,
    );
    return dailyForecasts;
  } catch (error) {
  }
};
