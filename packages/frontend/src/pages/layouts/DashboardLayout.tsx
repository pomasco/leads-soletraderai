import React from 'react';
import SideMenu from '../../components/Dashboard/SideMenu';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <SideMenu />
      <div id="dashboard-main-content" className="ml-64 min-h-screen bg-white">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;