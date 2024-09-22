import React from 'react'; // اضافه کردن React
import { render, screen } from '@testing-library/react';
import Header from '../../components/Header'; // مسیر صحیح به فایل Header

test('renders header with correct title', () => {
  // رندر کامپوننت Header
  render(<Header />);

  // بررسی اینکه عنوان به درستی نمایش داده شده است
  const headingElement = screen.getByText(/Weather App/i);
  expect(headingElement).toBeInTheDocument();
});
