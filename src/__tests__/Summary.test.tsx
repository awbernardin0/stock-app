// src/__tests__/Summary.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import Summary from '../components/Summary';

test('renders summary component', () => {
  render(<Summary />);
  const summaryElement = screen.getByText(/summary/i);
  expect(summaryElement).toBeInTheDocument();
});
