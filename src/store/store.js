import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice'; // مسیر صحیح را بررسی کنید

const store = configureStore({
  reducer: {
    weather: weatherReducer, // باید به درستی تنظیم شده باشد
  },
});

export default store;
