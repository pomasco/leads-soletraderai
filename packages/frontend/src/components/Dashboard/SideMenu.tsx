import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  UserCircle, 
  CreditCard, 
  MessageSquare,
  Settings,
  HelpCircle,
  Moon,
  LogOut
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

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

const SideMenu: React.FC = () => {
  const location = useLocation();
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const MenuItem = ({ icon: Icon, label, path }: { icon: any, label: string, path: string }) => {
    const isActive = location.pathname === path;
    
    return (
      <motion.div
        whileHover={{ x: 5 }}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
                   ${isActive ? 'bg-caribbean-current/10 text-caribbean-current' : 'text-dark-purple hover:text-caribbean-current'}`}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </motion.div>
    );
  };

  return (
    <div className="w-64 bg-white h-screen fixed left-0 top-0 shadow-lg flex flex-col z-50">
      <div className="p-6">
        <img
          src="/images/Logo/soletraderai-logo-black.png"
          alt="Sole Trader AI"
          className="h-8 mb-8"
        />
        
        <div className="mb-4">
          <p className="text-sm font-medium text-dark-purple/60 px-4 mb-2">
            Main Menu
          </p>
          {menuItems.map((item, index) => (
            <Link to={item.path} key={index}>
              <MenuItem {...item} />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto p-6">
        <div className="border-t border-dark-purple/10 pt-6">
          {bottomMenuItems.map((item, index) => (
            <Link to={item.path} key={index}>
              <MenuItem {...item} />
            </Link>
          ))}
          
          <motion.button
            onClick={handleLogout}
            whileHover={{ x: 5 }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left
                     text-dark-purple hover:text-caribbean-current"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;