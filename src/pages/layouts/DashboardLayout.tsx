import React from 'react';
import SideMenu from '../../components/Dashboard/SideMenu';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-dark-purple">
      <SideMenu />
      <div className="ml-64 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;