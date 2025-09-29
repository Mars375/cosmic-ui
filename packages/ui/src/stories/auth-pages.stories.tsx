import type { Meta, StoryObj } from '@storybook/react';
import { LoginPage, RegisterPage } from '../components/auth-pages';

const meta: Meta = {
  title: 'SaaSModules/AuthPages',
  tags: ['autodocs'],
};
export default meta;

export const Login: StoryObj = {
  render: () => <LoginPage />,
};

export const Register: StoryObj = {
  render: () => <RegisterPage />,
};
