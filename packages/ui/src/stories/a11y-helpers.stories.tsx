import type { Meta, StoryObj } from '@storybook/react';
import { SkipLink, VisuallyHidden } from '../components/a11y-helpers';

const meta: Meta = {
  title: 'UtilitiesAdvanced/AccessibilityHelpers',
  tags: ['autodocs'],
};
export default meta;

export const Helpers: StoryObj = {
  render: () => (
    <div className="text-white">
      <SkipLink />
      <a href="#main">Anchor to main</a>
      <div style={{ height: 50 }} />
      <main id="main">Main content</main>
      <p>
        <VisuallyHidden>Screen reader only text</VisuallyHidden>
      </p>
    </div>
  ),
};
