import { render, screen } from '@testing-library/react';
import App from './App';

test('No', () => {
  render('No');
  const text= screen.getByText('No');
  expect(text).toBeInTheDocument();
});
