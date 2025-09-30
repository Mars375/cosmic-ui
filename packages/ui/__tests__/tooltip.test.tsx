import React from 'react';
import { render, screen } from '@testing-library/react';
import { Tooltip } from '../src/components/tooltip';
import { Button } from '../src/components/button';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('renders trigger and is accessible', async () => {
  const { container } = render(
    <Tooltip content="Hello">
      <Button>Trigger</Button>
    </Tooltip>,
  );
  expect(screen.getByRole('button', { name: /trigger/i })).toBeInTheDocument();
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('matches snapshot', () => {
  const { asFragment } = render(
    <Tooltip content="Snapshot">
      <Button>Trigger</Button>
    </Tooltip>,
  );
  expect(asFragment()).toMatchSnapshot();
});

