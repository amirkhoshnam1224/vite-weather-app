import { renderHook, act } from '@testing-library/react-hooks';
import useGeolocation from '../hooks/useGeolocation';

describe('useGeolocation Hook', () => {
  beforeAll(() => {
    // شبیه‌سازی موفقیت‌آمیز geolocationبیا بگو چطور تقییرات را پوش کنیم تا اگر به مشکل خوردیم دورباره به نسخه قبلی کامیت برگردیمبیا بگو چطور تقییرات را پوش کنیم تا اگر به مشکل خوردیم دورباره به نسخه قبلی کامیت برگردیم
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

  test('should return coordinates when geolocation is successful', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useGeolocation());

    // انتظار برای به‌روزرسانی بعدی (وقتی اطلاعات geolocation به دست می‌آیند)
    await waitForNextUpdate();

    // بررسی اینکه اطلاعات موقعیت مکانی به درستی ذخیره شده‌اند
    expect(result.current.coords).toEqual({
      lat: 35.6892,
      lon: 51.3890,
    });
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  test('should return error when geolocation fails', async () => {
    // شبیه‌سازی خطای geolocation
    global.navigator.geolocation.getCurrentPosition.mockImplementationOnce(
      (successCallback, errorCallback) => errorCallback({
        message: 'Geolocation error',
      })
    );

    const { result, waitForNextUpdate } = renderHook(() => useGeolocation());

    await waitForNextUpdate();

    // بررسی خطا و اطمینان از اینکه اطلاعات موقعیت مکانی null هستند
    expect(result.current.coords).toBeNull();
    expect(result.current.error).toBe('Unable to retrieve your location. Please select a city manually.');
    expect(result.current.loading).toBe(false);
  });
});
