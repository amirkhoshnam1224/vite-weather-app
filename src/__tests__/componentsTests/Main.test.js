import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CitySelector from '../../containers/CitySelector';
import { cities } from '../../constants'; 
test('renders city selector and allows user to select a city', () => {
  const mockHandleCityChange = jest.fn(); 
  render(<CitySelector handleCityChange={mockHandleCityChange} />);
  const selectElement = screen.getByLabelText(/Select a City/i);
  expect(selectElement).toBeInTheDocument();
  fireEvent.change(selectElement, { target: { value: cities[0].name } });
  expect(mockHandleCityChange).toHaveBeenCalledTimes(1);
});
