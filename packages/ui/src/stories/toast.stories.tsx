import type { Meta, StoryObj } from '@storybook/react';
import {
  ToastProvider,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  ToastViewport,
} from '../components/toast';
import * as React from 'react';

const meta: Meta = {
  title: 'FeedbackDisplay/Toast',
  tags: ['autodocs'],
};
export default meta;

export const Basic: StoryObj = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <ToastProvider swipeDirection="right">
        <button
          type="button"
          className="rounded-md border border-cosmic-border px-3 py-2 text-sm text-white hover:bg-white/10"
          onClick={() => setOpen(true)}
        >
          Show toast
        </button>
        <ToastRoot open={open} onOpenChange={setOpen} duration={2000}>
          <ToastTitle>Saved</ToastTitle>
          <ToastDescription>Your changes have been saved successfully.</ToastDescription>
          <div className="mt-2 flex justify-end">
            <ToastAction altText="Undo">Undo</ToastAction>
          </div>
          <ToastClose />
        </ToastRoot>
        <ToastViewport />
      </ToastProvider>
    );
  },
};

