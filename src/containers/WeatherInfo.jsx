const WeatherInfo = ({ data }) => {
  return (
    <div>
      <h2>Weather in {data?.name || 'Unknown Location'}</h2>
      <p>Temperature: {data?.main?.temp ?? 'N/A'}°C</p>
      <p>Weather: {data?.weather?.[0]?.description || 'No description available'}</p>
    </div>
  );
};
export default WeatherInfo;
