import * as React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle } from '../src/components/drawer';

test('opens drawer and shows title', async () => {
  render(
    <Drawer>
      <DrawerTrigger asChild>
        <button>Open Drawer</button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Panel</DrawerTitle>
      </DrawerContent>
    </Drawer>,
  );
  await user.click(screen.getByRole('button', { name: /open drawer/i }));
  expect(await screen.findByText('Panel')).toBeInTheDocument();
});

