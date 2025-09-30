import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '../components/slider';

const meta: Meta<typeof Slider> = {
  title: 'BaseInputs/Slider',
  component: Slider,
  args: { defaultValue: [30], max: 100, step: 1 },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Slider> = {};

