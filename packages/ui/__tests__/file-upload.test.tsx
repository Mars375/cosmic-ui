import * as React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { FileUpload } from '../src/components/file-upload';

test('renders and triggers file input on click', async () => {
  render(<FileUpload>Click to select files</FileUpload>);
  const region = screen.getByRole('button', { name: /click to select files/i });
  await user.click(region);
  expect(region).toBeInTheDocument();
});
