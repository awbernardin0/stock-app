// src/__tests__/Log.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import Log from '../components/Log';

test('renders log component', () => {
  render(<Log />);
  const logElement = screen.getByText(/log/i);
  expect(logElement).toBeInTheDocument();
});
