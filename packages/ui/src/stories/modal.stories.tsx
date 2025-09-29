import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
} from '../components/modal';
import { Button } from '../components/button';

const meta: Meta<typeof Modal> = {
  title: 'Core/Modal',
  component: Modal,
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Modal> = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      return (
        <div style={{ padding: 24 }}>
          <Button onClick={() => setOpen(true)}>Open modal</Button>
          <Modal open={open} onOpenChange={setOpen}>
            <ModalHeader>
              <ModalTitle>Confirm action</ModalTitle>
              <ModalDescription>This action cannot be undone.</ModalDescription>
            </ModalHeader>
            <ModalContent>
              <p>Are you sure you want to proceed?</p>
            </ModalContent>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    };
    return <Demo />;
  },
};

export const Options: StoryObj<typeof Modal> = {
  render: () => {
    const Demo = () => {
      const [open, setOpen] = useState(false);
      const focusRef = React.useRef<HTMLButtonElement>(null);
      return (
        <div style={{ padding: 24 }}>
          <Button onClick={() => setOpen(true)}>Open with options</Button>
          <Modal
            open={open}
            onOpenChange={setOpen}
            closeOnOverlayClick={false}
            closeOnEsc={true}
            lockScroll={true}
            initialFocusRef={focusRef}
            showCloseButton={true}
          >
            <ModalHeader>
              <ModalTitle>Advanced options</ModalTitle>
            </ModalHeader>
            <ModalContent>
              <p>Overlay click is disabled here.</p>
            </ModalContent>
            <ModalFooter>
              <Button ref={focusRef} onClick={() => setOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    };
    return <Demo />;
  },
};
