import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../pages/components/DashboardHeader';
import DashboardFooter from '../pages/components/DashboardFooter';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <DashboardFooter />
    </div>
  );
};
