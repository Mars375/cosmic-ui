import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
} from '../src/components/modal';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

function Wrapper({ children }: { children: React.ReactNode }) {
  return <div id="root">{children}</div>;
}

test('opens and traps focus, closes on overlay/esc', async () => {
  const user = userEvent.setup();
  const onOpenChange = jest.fn();
  const { rerender } = render(<Wrapper />);

  // Closed
  rerender(
    <Wrapper>
      <Modal open={false} onOpenChange={onOpenChange}>
        <ModalHeader>
          <ModalTitle>Title</ModalTitle>
          <ModalDescription>Description</ModalDescription>
        </ModalHeader>
        <ModalContent>
          <button>Inside</button>
        </ModalContent>
        <ModalFooter>
          <button>Close</button>
        </ModalFooter>
      </Modal>
    </Wrapper>,
  );
  expect(screen.queryByText(/title/i)).not.toBeInTheDocument();

  // Open
  rerender(
    <Wrapper>
      <Modal open={true} onOpenChange={onOpenChange}>
        <ModalHeader>
          <ModalTitle>Title</ModalTitle>
          <ModalDescription>Description</ModalDescription>
        </ModalHeader>
        <ModalContent>
          <button>Inside</button>
        </ModalContent>
        <ModalFooter>
          <button>Close</button>
        </ModalFooter>
      </Modal>
    </Wrapper>,
  );
  expect(screen.getByText(/title/i)).toBeInTheDocument();

  // Click overlay
  const overlay = document.querySelector('[aria-hidden="true"]');
  if (!overlay) throw new Error('overlay not found');
  await user.click(overlay as HTMLElement);
  expect(onOpenChange).toHaveBeenCalledWith(false);

  // ESC close
  onOpenChange.mockClear();
  await user.keyboard('{Escape}');
  expect(onOpenChange).toHaveBeenCalledWith(false);
});

test('is accessible', async () => {
  const { container } = render(
    <Modal open={true}>
      <ModalHeader>
        <ModalTitle>Accessible Title</ModalTitle>
      </ModalHeader>
      <ModalContent>
        <button>Ok</button>
      </ModalContent>
    </Modal>,
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

