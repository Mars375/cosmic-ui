import type { Meta, StoryObj } from '@storybook/react';
import { FormWithReactHookForm } from '../components/form-rhf';

const meta: Meta<typeof FormWithReactHookForm> = {
  title: 'UtilitiesAdvanced/FormWithReactHookForm',
  component: FormWithReactHookForm,
  tags: ['autodocs'],
};
export default meta;

export const Example: StoryObj<typeof FormWithReactHookForm> = {};
