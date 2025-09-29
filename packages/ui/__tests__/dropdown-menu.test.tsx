import * as React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from '../src/components/dropdown-menu';

test('opens dropdown and shows items', async () => {
  render(
    <DropdownMenu>
      <DropdownTrigger asChild>
        <button>Open</button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownItem>Profile</DropdownItem>
      </DropdownContent>
    </DropdownMenu>,
  );
  await user.click(screen.getByRole('button', { name: /open/i }));
  expect(await screen.findByText('Profile')).toBeInTheDocument();
});
