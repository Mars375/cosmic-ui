import * as React from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

export interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
}

export const DashboardLayout = ({
  className,
  sidebar,
  topbar,
  children,
  ...props
}: DashboardLayoutProps) => {
  return (
    <div className={className} {...props}>
      {topbar}
      <div className="flex">
        <aside>{sidebar}</aside>
        <main className="min-h-[calc(100vh-3.5rem)] flex-1 p-4 text-foreground">{children}</main>
      </div>
    </div>
  );
};

DashboardLayout.displayName = 'DashboardLayout';
