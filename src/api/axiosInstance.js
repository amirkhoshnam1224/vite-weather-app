import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_OPENWEATHER_BASE_URL,
  params: {
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
    units: 'metric',
  },
});

export default axiosInstance;
