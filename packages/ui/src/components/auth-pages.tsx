import * as React from 'react';
import { Input } from './input';
import { Button } from './button';

export const LoginPage = () => {
  return (
    <div className="mx-auto max-w-sm rounded-md border border-cosmic-border bg-cosmic-surface p-6 text-white">
      <h1 className="mb-4 text-lg font-semibold">Sign in</h1>
      <form className="space-y-3">
        <div>
          <label className="mb-1 block text-sm">Email</label>
          <Input type="email" placeholder="you@company.com" />
        </div>
        <div>
          <label className="mb-1 block text-sm">Password</label>
          <Input type="password" placeholder="••••••••" />
        </div>
        <Button className="w-full">Sign in</Button>
      </form>
    </div>
  );
};

export const RegisterPage = () => {
  return (
    <div className="mx-auto max-w-sm rounded-md border border-cosmic-border bg-cosmic-surface p-6 text-white">
      <h1 className="mb-4 text-lg font-semibold">Create account</h1>
      <form className="space-y-3">
        <div>
          <label className="mb-1 block text-sm">Full name</label>
          <Input placeholder="Jane Doe" />
        </div>
        <div>
          <label className="mb-1 block text-sm">Email</label>
          <Input type="email" placeholder="you@company.com" />
        </div>
        <div>
          <label className="mb-1 block text-sm">Password</label>
          <Input type="password" placeholder="••••••••" />
        </div>
        <Button className="w-full">Create account</Button>
      </form>
    </div>
  );
};

LoginPage.displayName = 'LoginPage';
RegisterPage.displayName = 'RegisterPage';
