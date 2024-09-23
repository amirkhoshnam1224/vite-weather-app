import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  params: {
    appid: '222d90b4a36a08f635c2aff827c12d51',
    units: 'metric',
  },
});
export default axiosInstance;
