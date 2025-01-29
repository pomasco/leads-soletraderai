import React from 'react';
import SideMenu from '../../components/Dashboard/SideMenu';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isMenuCollapsed, setIsMenuCollapsed] = React.useState(false);

  const handleToggleMenu = () => {
    setIsMenuCollapsed(!isMenuCollapsed);
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <SideMenu isCollapsed={isMenuCollapsed} onToggle={handleToggleMenu} />
      <div 
        id="dashboard-main-content" 
        className={`${isMenuCollapsed ? 'ml-20' : 'ml-64'} min-h-screen bg-white transition-all duration-300`}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;