import React from 'react';
import { motion } from 'framer-motion';
import { MoreVertical, CheckCircle, AlertCircle } from 'lucide-react';

const IntegrationsTable: React.FC = () => {
  const searches = [
    {
      id: 1,
      name: 'Plumbers in Sydney',
      lastSync: '1 min ago',
      status: 'healthy',
      keywords: ['plumber', 'emergency plumber'],
      location: 'Sydney, Australia'
    },
    {
      id: 2,
      name: 'Electricians in Melbourne',
      lastSync: '5 min ago',
      status: 'review',
      keywords: ['electrician', '24/7 electrician'],
      location: 'Melbourne, Australia'
    },
    {
      id: 3,
      name: 'Mechanics in Brisbane',
      lastSync: 'Few sec ago',
      status: 'healthy',
      keywords: ['car mechanic', 'auto repair'],
      location: 'Brisbane, Australia'
    }
  ];

  return (
    <div className="bg-seasalt/5 backdrop-blur-lg rounded-xl overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-seasalt/10">
            <th className="text-left py-4 px-6 text-seasalt/60 font-medium">Search</th>
            <th className="text-left py-4 px-6 text-seasalt/60 font-medium">Keywords</th>
            <th className="text-left py-4 px-6 text-seasalt/60 font-medium">Location</th>
            <th className="text-left py-4 px-6 text-seasalt/60 font-medium">Status</th>
            <th className="text-left py-4 px-6 text-seasalt/60 font-medium">Last Updated</th>
            <th className="text-left py-4 px-6 text-seasalt/60 font-medium">Action</th>
            <th className="text-left py-4 px-6 text-seasalt/60 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {searches.map((search) => (
            <motion.tr
              key={search.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-b border-seasalt/10 hover:bg-seasalt/5"
            >
              <td className="py-4 px-6">
                <span className="text-seasalt font-medium">{search.name}</span>
              </td>
              <td className="py-4 px-6">
                <div className="flex flex-wrap gap-2">
                  {search.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-dark-cyan/20 text-dark-cyan rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="text-seasalt">{search.location}</span>
              </td>
              <td className="py-4 px-6">
                {search.status === 'healthy' ? (
                  <div className="flex items-center gap-2 text-celadon">
                    <CheckCircle className="w-5 h-5" />
                    <span>Healthy</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-yellow-400">
                    <AlertCircle className="w-5 h-5" />
                    <span>Review Suggested</span>
                  </div>
                )}
              </td>
              <td className="py-4 px-6">
                <span className="text-seasalt/60">{search.lastSync}</span>
              </td>
              <td className="py-4 px-6">
                <motion.button
                  className="px-4 py-1.5 bg-caribbean-current text-seasalt rounded-lg text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sync Now
                </motion.button>
              </td>
              <td className="py-4 px-6">
                <button className="text-seasalt/60 hover:text-seasalt">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IntegrationsTable;