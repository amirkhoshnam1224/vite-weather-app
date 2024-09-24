import axiosInstance from './axiosInstance';
export const fetchWeatherDataApi = async (lat, lon) => {
  const response = await axiosInstance.get('weather', {
    params: {
      lat,
      lon,
    },
  });
  return response.data;
};