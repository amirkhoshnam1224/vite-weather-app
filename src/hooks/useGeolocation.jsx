import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });
        setLoading(false);
      },
      (err) => {
        setError('Unable to retrieve your location. Please select a city manually.');
        setLoading(false);
      },
      { timeout: 10000 } // اضافه کردن timeout برای جلوگیری از انتظار بی‌پایان
    );
  }, []);

  return { coords, error, loading };
};

export default useGeolocation;
