import type { Meta, StoryObj } from '@storybook/react';
import { Table, Thead, Tbody, Tr, Th, Td } from '../components/table';

const meta: Meta<typeof Table> = {
  title: 'DataContent/Table',
  component: Table,
  tags: ['autodocs'],
};
export default meta;

export const Basic: StoryObj<typeof Table> = {
  render: () => (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Role</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>Ada Lovelace</Td>
          <Td>ada@cosmicui.dev</Td>
          <Td>Admin</Td>
        </Tr>
        <Tr>
          <Td>Grace Hopper</Td>
          <Td>grace@cosmicui.dev</Td>
          <Td>Engineer</Td>
        </Tr>
      </Tbody>
    </Table>
  ),
};
