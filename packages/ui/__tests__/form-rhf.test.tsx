import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { FormWithReactHookForm } from '../src/components/form-rhf';

test('renders form fields', () => {
  render(<FormWithReactHookForm />);
  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Role')).toBeInTheDocument();
});
