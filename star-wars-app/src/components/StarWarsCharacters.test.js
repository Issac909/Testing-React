import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import StarWarsCharacters from './StarWarsCharacters';
import { getData as mockGetData } from '../api';

jest.mock('../api');

test('renders the list of start wars characters along with next and prev buttons', async () => {
    mockGetData.mockResolvedValueOnce(
    {
    results: [{ 
        name: "", 
        height: "", 
        mass: "", 
        hair_color: "", 
        skin_color: "", 
    }],
    next: '',
    prev: ''
    })
    const {  getByText } = render(<StarWarsCharacters />);

    const nextButton = getByText(/next/i);
    const prevButton = getByText(/previous/i);

    fireEvent.click(nextButton);
    fireEvent.click(prevButton);
    expect(mockGetData).toHaveBeenCalledTimes(1);

    wait(() => expect(getByText(/'Darth'/i)));
})