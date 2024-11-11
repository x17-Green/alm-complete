import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardFooter from './DashboardFooter';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-grow">
        {children}
      </main>
      <DashboardFooter />
    </div>
  );
};
