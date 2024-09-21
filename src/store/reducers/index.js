import { combineReducers } from '@reduxjs/toolkit';
import weatherReducer from './weatherReducer';

const rootReducer = combineReducers({
  weather: weatherReducer,
});

export default rootReducer;
