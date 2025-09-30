# cosmic-ui-mars

A modern, accessible React component library with dark mode support built with Tailwind CSS and TypeScript.

## Features

- 🎨 **60+ Components** - Comprehensive set of UI components
- 🌙 **Dark Mode** - Built-in dark mode support
- ♿ **Accessible** - WCAG compliant components
- 🎯 **TypeScript** - Full TypeScript support
- 🎨 **Tailwind CSS** - Built with Tailwind CSS
- 📱 **Responsive** - Mobile-first design
- 🚀 **Tree Shakeable** - Import only what you need

## Installation

```bash
npm install cosmic-ui-mars
# or
yarn add cosmic-ui-mars
# or
pnpm add cosmic-ui-mars
```

## Peer Dependencies

```bash
npm install react react-dom
npm install tailwindcss
```

## Quick Start

1. **Install Tailwind CSS** (if not already installed):

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. **Configure Tailwind CSS** in `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/cosmic-ui-mars/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. **Add Tailwind directives** to your CSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. **Import and use components**:

```tsx
import { Button, Card, Input } from 'cosmic-ui-mars';

function App() {
  return (
    <div>
      <Button>Click me</Button>
      <Card>
        <Input placeholder="Enter text..." />
      </Card>
    </div>
  );
}
```

## Dark Mode

The components support dark mode out of the box. To enable it:

1. **Add the dark mode class** to your HTML:

```html
<html class="dark">
```

2. **Use a theme provider** (recommended):

```tsx
import { ThemeProvider } from 'cosmic-ui-mars';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      {/* Your app */}
    </ThemeProvider>
  );
}
```

## Components

### Basic Components
- Button
- Input
- Card
- Badge
- Avatar
- Alert

### Form Components
- Checkbox
- Radio Group
- Select
- Textarea
- Switch
- Slider

### Layout Components
- Sidebar
- Topbar
- Drawer
- Modal
- Tabs
- Accordion

### Data Display
- Table
- Data Table
- Timeline
- Calendar
- Charts (Line, Pie, Sparkline)

### Navigation
- Breadcrumbs
- Pagination
- Navigation Menu

### Feedback
- Toast
- Spinner
- Progress Bar
- Skeleton

### Advanced Components
- AI Assistant
- Chat Widget
- Command Palette
- File Upload
- Kanban Board
- Dashboard Layout

## Documentation

Visit [https://cosmic-ui.vercel.app](https://cosmic-ui.vercel.app) for complete documentation, examples, and API reference.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [Cosmic UI Team](https://github.com/Mars375/cosmic-ui)
