import React from 'react';
import { render, act } from '@testing-library/react';
import useGeolocation from '../../hooks/useGeolocation.jsx';

const TestComponent = () => {
  const { coords, error, loading } = useGeolocation();
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {coords && (
        <p>
          Latitude: {coords.lat}, Longitude: {coords.lon}
        </p>
      )}
    </div>
  );
};

describe('useGeolocation', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it('should set coordinates when geolocation is successful', () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn((success) => {
        success({ coords: { latitude: 12.34, longitude: 56.78 } });
      }),
    };
    global.navigator.geolocation = mockGeolocation;

    const { getByText } = render(<TestComponent />);

    act(() => {
      jest.runAllTimers();
    });

    expect(getByText(/latitude: 12.34/i)).toBeInTheDocument();
    expect(getByText(/longitude: 56.78/i)).toBeInTheDocument();
  });

  it('should set error when geolocation fails', () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn((success, error) => {
        error(new Error('Geolocation error'));
      }),
    };
    global.navigator.geolocation = mockGeolocation;

    const { getByText } = render(<TestComponent />);

    act(() => {
      jest.runAllTimers();
    });

    expect(getByText(/unable to retrieve your location/i)).toBeInTheDocument();
  });
});
