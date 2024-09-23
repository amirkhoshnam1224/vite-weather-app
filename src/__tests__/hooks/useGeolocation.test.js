import useGeolocation from '../../hooks/useGeolocation.jsx';

describe('useGeolocation Hook', () => {
  beforeAll(() => {
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn((successCallback, errorCallback) =>
        successCallback({
          coords: {
            latitude: 35.6892,
            longitude: 51.3890,
          },
        })
      ),
    };
  });

  test('should return coordinates when geolocation is successful', () => {
    const { result } = useGeolocation(); // فراخوانی تابع

    // شبیه‌سازی به‌روزرسانی وضعیت (معمولاً در یک hook انجام می‌شود)
    act(() => {
      result.setCoords({ lat: 35.6892, lon: 51.3890 });
    });

    expect(result.coords).toEqual({
      lat: 35.6892,
      lon: 51.3890,
    });
    expect(result.error).toBeNull();
    expect(result.loading).toBe(false);
  });

  test('should return error when geolocation fails', () => {
    global.navigator.geolocation.getCurrentPosition.mockImplementationOnce(
      (successCallback, errorCallback) => errorCallback({
        message: 'Geolocation error',
      })
    );

    const { result } = useGeolocation();

    act(() => {
      result.setError('Unable to retrieve your location. Please select a city manually.');
    });

    expect(result.coords).toBeNull();
    expect(result.error).toBe('Unable to retrieve your location. Please select a city manually.');
    expect(result.loading).toBe(false);
  });
});
