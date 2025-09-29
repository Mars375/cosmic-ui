import * as React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Accordion } from '../src/components/accordion';

test('opens and closes accordion item', async () => {
  render(
    <Accordion
      type="single"
      collapsible
      items={[{ value: 'a', header: 'Header A', content: 'Content A' }]}
    />,
  );
  const trigger = screen.getByRole('button', { name: /header a/i });
  await user.click(trigger);
  expect(await screen.findByText('Content A')).toBeInTheDocument();
  await user.click(trigger);
  expect(screen.queryByText('Content A')).not.toBeInTheDocument();
});
