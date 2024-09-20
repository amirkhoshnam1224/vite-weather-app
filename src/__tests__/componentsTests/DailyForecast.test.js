import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import DailyForecast from '../../components/DailyForecast';

jest.mock('axios');  // شبیه‌سازی axios

// تست حالت بارگذاری
test('renders loading state initially', async () => {
  // اینجا می‌خواهیم مطمئن شویم که حالت بارگذاری نمایش داده می‌شود
  axios.get.mockImplementationOnce(() => new Promise(() => {}));  // درخواست را متوقف می‌کنیم

  await act(async () => {
    render(<DailyForecast lat={52.52} lon={13.405} />);
  });

  expect(screen.getByText(/Loading forecast.../i)).toBeInTheDocument();
});

// تست حالت خطا
test('renders error message on API failure', async () => {
  axios.get.mockRejectedValueOnce(new Error('Network Error'));

  await act(async () => {
    render(<DailyForecast lat={52.52} lon={13.405} />);
  });

  await waitFor(() => {
    expect(screen.getByText(/Error fetching daily forecast/i)).toBeInTheDocument();
  });
});

// تست نمایش صحیح داده‌های پیش‌بینی
test('renders forecast data correctly', async () => {
  const mockResponse = {
    data: {
      list: [
        {
          dt: 1633046400,
          main: { temp: 20, humidity: 60 },
          weather: [{ description: 'clear sky' }],
          wind: { speed: 5 },
        },
      ],
    },
  };

  axios.get.mockResolvedValueOnce(mockResponse);

  await act(async () => {
    render(<DailyForecast lat={52.52} lon={13.405} />);
  });

  await waitFor(() => {
    expect(screen.getByText(/Temperature: 20°C/i)).toBeInTheDocument();
    expect(screen.getByText(/Condition: clear sky/i)).toBeInTheDocument();
    expect(screen.getByText(/Humidity: 60%/i)).toBeInTheDocument();
    expect(screen.getByText(/Wind Speed: 5 m\/s/i)).toBeInTheDocument();
  });
});
