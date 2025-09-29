import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../src/components/card';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('renders card with title and content', () => {
  render(
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Body</p>
      </CardContent>
      <CardFooter>
        <div>Footer</div>
      </CardFooter>
    </Card>,
  );
  expect(screen.getByText(/title/i)).toBeInTheDocument();
  expect(screen.getByText(/body/i)).toBeInTheDocument();
  expect(screen.getByText(/footer/i)).toBeInTheDocument();
});

test('is accessible', async () => {
  const { container } = render(
    <Card aria-label="Cosmic Card">
      <CardContent>Content</CardContent>
    </Card>,
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
