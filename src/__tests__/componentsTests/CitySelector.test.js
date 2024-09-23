import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CitySelector from '../../containers/CitySelector';
describe('CitySelector Component', () => {
    const mockHandleCityChange = jest.fn();
    const mockCities = [
        { name: 'Tehran' },
        { name: 'Mashhad' },
        { name: 'Isfahan' },
    ];
    test('renders correctly and displays city options', () => {
        render(<CitySelector handleCityChange={mockHandleCityChange} />);
        const selectElement = screen.getByLabelText(/Select a City:/i);
        expect(selectElement).toBeInTheDocument();
        mockCities.forEach((city) => {
            expect(screen.getByText(city.name)).toBeInTheDocument();
        });
    });
    test('calls handleCityChange when a city is selected', () => {
        render(<CitySelector handleCityChange={mockHandleCityChange} />);
        const selectElement = screen.getByLabelText(/Select a City:/i);
        fireEvent.change(selectElement, { target: { value: 'Tehran' } });
        expect(mockHandleCityChange).toHaveBeenCalled();
    });
});
