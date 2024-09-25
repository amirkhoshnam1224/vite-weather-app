import { useState, useEffect } from 'react';

const useGeolocation = () => {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
      return;
    }
    const getPosition = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lon: longitude });
          setLoading(false);
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            setError('Location access denied. Please enable location services.');
          } else {
            setError('Unable to retrieve your location. Please select a city manually.');
          }
          setLoading(false);
        },
        { timeout: 10000 }
      );
    };

    getPosition();
  }, []);

  return { coords, error, loading };
};

export default useGeolocation;
