import * as React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Popover, PopoverTrigger, PopoverContent } from '../src/components/popover';

test('opens popover and shows content', async () => {
  render(
    <Popover>
      <PopoverTrigger asChild>
        <button>Open Popover</button>
      </PopoverTrigger>
      <PopoverContent>Some content</PopoverContent>
    </Popover>,
  );
  await user.click(screen.getByRole('button', { name: /open popover/i }));
  expect(await screen.findByText('Some content')).toBeInTheDocument();
});
