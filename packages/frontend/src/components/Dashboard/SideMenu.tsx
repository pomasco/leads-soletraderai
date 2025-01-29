import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  UserCircle, 
  CreditCard, 
  MessageSquare,
  Settings,
  HelpCircle,
  Moon,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface SideMenuProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: Users, label: 'Agents', path: '/dashboard/agents' },
  { icon: UserCircle, label: 'Profile', path: '/dashboard/profile' },
  { icon: CreditCard, label: 'Billing', path: '/dashboard/billing' },
  { icon: MessageSquare, label: 'Contact Us', path: '/dashboard/contact' },
];

const bottomMenuItems = [
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  { icon: HelpCircle, label: 'Help & Center', path: '/dashboard/help' },
  { icon: Moon, label: 'Dark Mode', path: '#' },
];

const SideMenu: React.FC<SideMenuProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const MenuItem = ({ icon: Icon, label, path }: { icon: any, label: string, path: string }) => {
    const isActive = location.pathname === path;
    
    return (
      <motion.div
        className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-lg cursor-pointer w-full text-left
                 ${isActive ? 'bg-seasalt/10 text-seasalt' : 'text-seasalt/80 hover:text-seasalt'}`}
        whileHover={{ x: 5 }}
      >
        <Icon className="w-5 h-5" />
        <AnimatePresence>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="font-medium whitespace-nowrap overflow-hidden"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div 
      id="dashboard-sidemenu" 
      className={`${isCollapsed ? 'w-20' : 'w-64'} bg-dark-purple h-screen fixed left-0 top-0 shadow-lg flex flex-col z-50 transition-all duration-300`}
    >
      {/* Toggle Button */}
      <motion.button
        onClick={onToggle}
        className="absolute -right-4 top-8 bg-dark-purple rounded-full p-2 shadow-lg text-seasalt hover:text-celadon transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </motion.button>

      <div className="p-6">
        <div className={`${isCollapsed ? 'justify-center' : ''} flex mb-8`}>
          <img
            src="/images/Logo/soletraderai-logo-white.png"
            alt="Sole Trader AI"
            className={`${isCollapsed ? 'h-6' : 'h-8'} transition-all duration-300`}
          />
        </div>
        
        <div className="mb-4">
          {!isCollapsed && (
            <p className="text-sm font-medium text-seasalt/60 px-4 mb-2">
              Main Menu
            </p>
          )}
          {menuItems.map((item, index) => (
            <Link to={item.path} key={index}>
              <MenuItem {...item} />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto p-6">
        <div className="border-t border-seasalt/10 pt-6">
          {bottomMenuItems.map((item, index) => (
            <div key={index}>
              {item.path !== '#' ? (
                <Link to={item.path}>
                  <MenuItem {...item} />
                </Link>
              ) : (
                <button className="w-full" onClick={() => console.log('Toggle theme')}>
                  <MenuItem {...item} />
                </button>
              )}
            </div>
          ))}
          
          <motion.button
            onClick={handleLogout}
            whileHover={{ x: 5 }}
            className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-lg w-full text-left text-seasalt/80 hover:text-seasalt`}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="font-medium">Log Out</span>}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;