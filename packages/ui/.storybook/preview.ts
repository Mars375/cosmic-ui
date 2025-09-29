import type { Preview } from "@storybook/react";
import "../src/styles/tailwind.css";

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    a11y: { disableOtherRules: false }
  }
};

export default preview;
