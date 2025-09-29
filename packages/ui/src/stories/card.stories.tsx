import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/card';
import { Button } from '../components/button';

const meta: Meta<typeof Card> = {
  title: 'Core/Card',
  component: Card,
  args: { padding: 'md' },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Card> = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Optional description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content goes here. Use this for basic layout blocks in dashboards.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary">Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: StoryObj<typeof Card> = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Card variant="default">
        <CardContent>Default</CardContent>
      </Card>
      <Card variant="elevated">
        <CardContent>Elevated</CardContent>
      </Card>
      <Card variant="outline">
        <CardContent>Outline</CardContent>
      </Card>
    </div>
  ),
};
