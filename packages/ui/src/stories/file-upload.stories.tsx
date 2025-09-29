import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from '../components/file-upload';

const meta: Meta<typeof FileUpload> = {
  title: 'BaseInputs/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof FileUpload> = {
  args: {
    children: 'Click to select files',
  },
};
