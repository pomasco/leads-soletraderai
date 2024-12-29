import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import SideMenu from '../../components/Dashboard/SideMenu';
import { useNavigate } from 'react-router-dom';

const AgentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAgents = async () => {
      const { data: userAgents, error } = await supabase
        .from('user_agents')
        .select(`
          agent_id,
          is_active,
          last_used,
          agents (
            id,
            name,
            description,
            category,
            icon
          )
        `)
        .order('last_used', { ascending: false });

      if (!error && userAgents) {
        setAgents(userAgents.map(ua => ({
          ...ua.agents,
          is_active: ua.is_active,
          last_used: ua.last_used
        })));
      }
      setLoading(false);
    };

    fetchAgents();
  }, []);

  return (
    <div className="min-h-screen bg-dark-purple">
      <SideMenu />
      <div className="pl-64">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-seasalt mb-2">
                Your Agents
              </h1>
              <p className="text-seasalt/60">
                Manage and interact with your AI agents
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-seasalt">Loading agents...</div>
          ) : agents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-seasalt/60 mb-4">You haven't employed any agents yet.</p>
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
              >
                <Plus className="w-5 h-5 mr-2" />
                Employ Your First Agent
              </motion.button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent) => (
                <motion.div
                  key={agent.id}
                  className="bg-seasalt/5 backdrop-blur-lg rounded-xl p-6 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate(`/dashboard/agents/${agent.id}`)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-seasalt mb-2">
                        {agent.name}
                      </h3>
                      <p className="text-seasalt/60 text-sm">
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
                    <p className="text-seasalt/40 text-sm">
                      Last used: {new Date(agent.last_used).toLocaleDateString()}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;