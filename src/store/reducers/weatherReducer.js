const initialState = {
  location: { lat: null, lon: null },
  weatherData: null,
  error: null,
  selectedCity: 'current',
};
export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOCATION':
      return { ...state, location: action.payload };
    case 'SET_WEATHER_DATA':
      return { ...state, weatherData: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SELECTED_CITY':
      return { ...state, selectedCity: action.payload };
    default:
      return state;
  }
}
