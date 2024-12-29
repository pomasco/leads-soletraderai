import React from 'react';
import { motion } from 'framer-motion';
import { Clock, RefreshCcw, Users } from 'lucide-react';

interface StatsProps {
  stats: {
    credits: number;
    searches: number;
    leads: number;
  };
}

const DashboardStats: React.FC<StatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Credits Available',
      value: stats.credits,
      change: '+7',
      period: 'in the last 30 days',
      icon: Clock,
      color: 'bg-celadon/20',
      iconColor: 'text-celadon',
      changeType: 'positive'
    },
    {
      title: 'Total Searches',
      value: stats.searches,
      change: '+31',
      period: 'in the last 30 days',
      icon: RefreshCcw,
      color: 'bg-caribbean-current/20',
      iconColor: 'text-caribbean-current',
      changeType: 'positive'
    },
    {
      title: 'Leads Generated',
      value: stats.leads,
      change: '+32',
      period: 'in the last 30 days',
      icon: Users,
      color: 'bg-dark-cyan/20',
      iconColor: 'text-dark-cyan',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statCards.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-seasalt/5 backdrop-blur-lg rounded-xl p-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-seasalt/60 mb-1">{stat.title}</p>
              <h3 className="text-4xl font-heading font-bold text-seasalt">
                {stat.value.toLocaleString()}
              </h3>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-sm ${
              stat.changeType === 'positive' ? 'text-celadon' : 'text-red-400'
            }`}>
              {stat.change}
            </span>
            <span className="text-sm text-seasalt/40">{stat.period}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;