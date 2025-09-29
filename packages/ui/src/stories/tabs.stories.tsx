import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Core/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Tabs> = {
  render: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="billing">Billing</TabsTrigger>
      </TabsList>
      <div style={{ marginTop: 12 }}>
        <TabsContent value="account">Account content</TabsContent>
        <TabsContent value="security">Security content</TabsContent>
        <TabsContent value="billing">Billing content</TabsContent>
      </div>
    </Tabs>
  ),
};

export const Vertical: StoryObj<typeof Tabs> = {
  render: () => (
    <Tabs defaultValue="a" orientation="vertical" style={{ display: 'flex', gap: 12 }}>
      <TabsList orientation="vertical">
        <TabsTrigger value="a">A</TabsTrigger>
        <TabsTrigger value="b">B</TabsTrigger>
        <TabsTrigger value="c">C</TabsTrigger>
      </TabsList>
      <div>
        <TabsContent value="a">A content</TabsContent>
        <TabsContent value="b">B content</TabsContent>
        <TabsContent value="c">C content</TabsContent>
      </div>
    </Tabs>
  ),
};

export const DisabledAndManualActivation: StoryObj<typeof Tabs> = {
  render: () => (
    <Tabs defaultValue="one" activationMode="manual">
      <TabsList>
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two" disabled>
          Two (disabled)
        </TabsTrigger>
        <TabsTrigger value="three">Three</TabsTrigger>
      </TabsList>
      <div style={{ marginTop: 12 }}>
        <TabsContent value="one">One content</TabsContent>
        <TabsContent value="two">Two content</TabsContent>
        <TabsContent value="three">Three content</TabsContent>
      </div>
    </Tabs>
  ),
};
