import React from 'react';
import { render, screen } from '@testing-library/react';
import Gallery from './Gallery';

const mockArtworks = [
  { id: 1, title: 'Artwork 1', image: 'image1.jpg', price: 100 },
  { id: 2, title: 'Artwork 2', image: 'image2.jpg', price: 200 },
];

jest.mock('@/lib/axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: mockArtworks })),
}));

describe('Gallery Component', () => {
  test('renders artworks from API', async () => {
    render(<Gallery />);
    expect(await screen.findByText(/artwork 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/artwork 2/i)).toBeInTheDocument();
  });
}); 