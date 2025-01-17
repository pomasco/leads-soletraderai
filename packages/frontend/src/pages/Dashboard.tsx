import React from 'react';
import { motion } from 'framer-motion';
import { Clock, RefreshCcw, Users, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import DashboardLayout from './layouts/DashboardLayout';
import ScrapingForm from '../components/ScrapingForm/ScrapingForm';
import DashboardStats from '../components/Dashboard/DashboardStats';
import IntegrationsTable from '../components/Dashboard/IntegrationsTable';

const Dashboard: React.FC = () => {
  const [user, setUser] = React.useState<any>(null);
  const [stats, setStats] = React.useState({
    credits: 1021,
    searches: 3731,
    leads: 971
  });

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-heading font-bold text-dark-purple mb-2">
              Welcome back, {user?.user_metadata?.full_name || 'User'} 👋✨
            </h1>
            <p className="text-dark-purple/60">
              Manage your lead generation and track your progress
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-dark-purple/60">
              <span>Showing:</span>
              <select className="bg-white border border-dark-purple/20 rounded-lg px-3 py-1.5 text-dark-purple">
                <option>Latest</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Export Data
            </motion.button>
          </div>
        </div>

        <DashboardStats stats={stats} />

        <div className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-heading font-bold text-dark-purple mb-2">
                Recent Searches
              </h2>
              <p className="text-dark-purple/60">
                View and manage your recent lead generation searches
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-dark-purple/60">
                <span>Filter:</span>
                <select className="bg-white border border-dark-purple/20 rounded-lg px-3 py-1.5 text-dark-purple">
                  <option>All</option>
                  <option>Completed</option>
                  <option>In Progress</option>
                </select>
              </div>
              <motion.button
                className="btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
                New Search
              </motion.button>
            </div>
          </div>

          <IntegrationsTable />
        </div>
        </div>
    </DashboardLayout>
  );
};

export default Dashboard;