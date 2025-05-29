import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from './Cart';

const mockCartItems = [
  { id: 1, title: 'Artwork 1', quantity: 2, price: 100 },
  { id: 2, title: 'Artwork 2', quantity: 1, price: 200 },
];

jest.mock('@/lib/axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: mockCartItems })),
  delete: jest.fn(() => Promise.resolve()),
  patch: jest.fn(() => Promise.resolve()),
}));

describe('Cart Component', () => {
  test('renders cart items', async () => {
    render(<Cart />);
    expect(await screen.findByText(/artwork 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/artwork 2/i)).toBeInTheDocument();
  });

  test('allows removing items from cart', async () => {
    render(<Cart />);
    fireEvent.click(await screen.findByRole('button', { name: /remove/i }));
    expect(screen.queryByText(/artwork 1/i)).not.toBeInTheDocument();
  });

  test('allows updating item quantity', async () => {
    render(<Cart />);
    const quantityInput = await screen.findByDisplayValue('2');
    fireEvent.change(quantityInput, { target: { value: '3' } });
    expect(quantityInput).toHaveValue(3);
  });
}); 