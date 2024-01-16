// src/__tests__/PauseResumeButton.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PauseResumeButton from '../components/PauseResumeButton';

test('renders pause/resume button', () => {
  render(<PauseResumeButton />);
  const buttonElement = screen.getByText(/pause/i);
  expect(buttonElement).toBeInTheDocument();
});

test('clicking on the button toggles pause/resume', () => {
  render(<PauseResumeButton />);
  const buttonElement = screen.getByText(/pause/i);

  fireEvent.click(buttonElement);
  expect(buttonElement).toHaveTextContent(/resume/i);

  fireEvent.click(buttonElement);
  expect(buttonElement).toHaveTextContent(/pause/i);
});
