import axiosInstance from '../utils/axiosInstance';
export const fetchWeatherDataApi = async (lat, lon) => {
  const response = await axiosInstance.get('weather', {
    params: {
      lat,
      lon,
    },
  });
  console.log('Api:', response.data);
  return response.data;
};