import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Table, Thead, Tbody, Tr, Th, Td } from '../src/components/table';

test('renders table structure and content', () => {
  render(
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Ada</Td>
          <Td>ada@cosmicui.dev</Td>
        </Tr>
      </Tbody>
    </Table>,
  );
  expect(screen.getByRole('table')).toBeInTheDocument();
  expect(screen.getByText('Ada')).toBeInTheDocument();
});
