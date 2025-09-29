import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import {
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastViewport,
} from '../src/components/toast';
import * as React from 'react';

test('shows toast on open', async () => {
  const Demo = () => {
    const [open, setOpen] = React.useState(false);
    return (
      <ToastProvider>
        <button onClick={() => setOpen(true)}>Open</button>
        <ToastRoot open={open} onOpenChange={setOpen}>
          <ToastTitle>Title</ToastTitle>
          <ToastDescription>Desc</ToastDescription>
          <ToastAction altText="Ok">Ok</ToastAction>
        </ToastRoot>
        <ToastViewport />
      </ToastProvider>
    );
  };

  render(<Demo />);
  await user.click(screen.getByRole('button', { name: /open/i }));
  expect(await screen.findByText('Title')).toBeInTheDocument();
});
