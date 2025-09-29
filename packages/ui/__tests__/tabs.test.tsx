import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../src/components/tabs';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('renders tabs and selects by click', async () => {
  const user = userEvent.setup();
  render(
    <Tabs defaultValue="one">
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
      </TabsList>
      <TabsContent value="one">Content One</TabsContent>
      <TabsContent value="two">Content Two</TabsContent>
    </Tabs>,
  );
  expect(screen.getByText(/content one/i)).toBeVisible();
  await user.click(screen.getByRole('tab', { name: /two/i }));
  expect(screen.getByText(/content two/i)).toBeVisible();
});

test('keyboard navigation moves focus and selects with Enter/Space', async () => {
  const user = userEvent.setup();
  render(
    <Tabs defaultValue="one" activationMode="manual">
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
        <TabsTrigger value="three">Three</TabsTrigger>
      </TabsList>
      <TabsContent value="one">Content One</TabsContent>
      <TabsContent value="two">Content Two</TabsContent>
      <TabsContent value="three">Content Three</TabsContent>
    </Tabs>,
  );
  const tabs = screen.getAllByRole('tab');
  tabs[0].focus();
  await user.keyboard('{ArrowRight}');
  expect(tabs[1]).toHaveFocus();
  await user.keyboard('{Enter}');
  expect(screen.getByText(/content two/i)).toBeVisible();
  await user.keyboard('{ArrowRight}');
  expect(tabs[2]).toHaveFocus();
  await user.keyboard(' ');
  expect(screen.getByText(/content three/i)).toBeVisible();
});

test('disabled triggers cannot be activated', async () => {
  const user = userEvent.setup();
  render(
    <Tabs defaultValue="one" activationMode="manual">
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two" disabled>
          Two
        </TabsTrigger>
      </TabsList>
      <TabsContent value="one">Content One</TabsContent>
      <TabsContent value="two">Content Two</TabsContent>
    </Tabs>,
  );
  const disabledTab = screen.getByRole('tab', { name: /two/i });
  await user.click(disabledTab);
  expect(screen.getByText(/content one/i)).toBeVisible();
});

test('is accessible', async () => {
  const { container } = render(
    <Tabs defaultValue="one">
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two">Two</TabsTrigger>
      </TabsList>
      <TabsContent value="one">Content One</TabsContent>
      <TabsContent value="two">Content Two</TabsContent>
    </Tabs>,
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
