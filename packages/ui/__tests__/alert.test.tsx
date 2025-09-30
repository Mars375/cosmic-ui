import React from 'react';
import { render, screen } from '@testing-library/react';
import { Alert } from '../src/components/alert';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('renders title and message', () => {
  render(<Alert title="Info">Hello</Alert>);
  expect(screen.getByText(/info/i)).toBeInTheDocument();
  expect(screen.getByText(/hello/i)).toBeInTheDocument();
});

test('is accessible', async () => {
  const { container } = render(
    <Alert variant="success" title="Success">
      Ok
    </Alert>,
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('matches snapshot', () => {
  const { asFragment } = render(
    <Alert variant="error" title="Error">
      Oops
    </Alert>,
  );
  expect(asFragment()).toMatchSnapshot();
});

