import React from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { supabase } from '../../../lib/supabase';

interface Agent {
  id: string;
  slug: string;
  name: string;
  description: string;
  categories: string[];
  icon: string;
  is_active: boolean;
  last_used: string;
}

const AgentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = React.useState<Agent[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  React.useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: userAgents, error } = await supabase
        .from('user_agents')
        .select(`
          last_used,
          is_active,
          agents (
            id,
            slug,
            name,
            description,
            categories,
            icon
          )
        `)
        .eq('user_id', user.id)
        .order('last_used', { ascending: false });

      if (error) throw error;

      if (userAgents && Array.isArray(userAgents)) {
        setAgents(userAgents.map(ua => ({
          ...ua.agents,
          is_active: ua.is_active,
          last_used: ua.last_used
        })));
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                          (agent.categories && agent.categories.includes(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(agents.flatMap(agent => agent.categories || []))];

  return (
    <DashboardLayout>
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-dark-purple mb-2">
            Your Agents
          </h1>
          <p className="text-dark-purple">
            Manage and interact with your AI agents
          </p>
        </div>

        <motion.button
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/agents')}
        >
          <Plus className="w-5 h-5" />
          Add New Agent
        </motion.button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-purple" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search agents..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-dark-purple/10 rounded-lg
                     text-dark-purple placeholder:text-dark-purple focus:outline-none focus:border-dark-purple/20"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-purple/40" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="pl-10 pr-8 py-2 bg-white border border-dark-purple/10 rounded-lg
                     text-dark-purple appearance-none cursor-pointer focus:outline-none focus:border-dark-purple/20"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-dark-purple/60">Loading agents...</p>
        </div>
      ) : filteredAgents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-dark-purple mb-4">No agents found</p>
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/agents')}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Your First Agent
          </motion.button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <motion.div
              key={agent.id}
              className="bg-white border border-dark-purple/10 rounded-xl p-6 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate(`/dashboard/agents/${agent.slug}`)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-heading font-bold text-dark-purple mb-2">
                    {agent.name}
                  </h3>
                  <p className="text-dark-purple text-sm">
                    {agent.description}
                  </p>
                </div>
                <div className={`p-2 rounded-lg ${
                  agent.is_active ? 'bg-celadon/20' : 'bg-dark-cyan/20'
                }`}>
                  <span className={`text-sm ${
                    agent.is_active ? 'text-celadon' : 'text-dark-cyan'
                  }`}>
                    {agent.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              {agent.last_used && (
                <p className="text-dark-purple text-sm">
                  Last used: {new Date(agent.last_used).toLocaleDateString()}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
    </DashboardLayout>
  );
};

export default AgentsPage;