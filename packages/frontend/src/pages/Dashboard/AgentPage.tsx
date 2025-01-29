import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Bot } from 'lucide-react';
import AgentForm from '../../components/Agent/AgentForm';
import LeadsyAgent from './Agents/LeadsyAgent';
import { supabase } from '../../lib/supabase';
import DashboardLayout from '../layouts/DashboardLayout';

const AgentPage: React.FC = () => {
  const { agentSlug } = useParams<{ agentSlug: string }>();
  const navigate = useNavigate();
  const [agent, setAgent] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchAgent = async () => {
      setLoading(true);
      setError(null);

      if (!agentSlug) {
        setError('Agent not found');
        setLoading(false);
        return;
      }

      try {
        const { data, error: fetchError } = await supabase
          .from('agents')
          .select(`
            id,
            slug,
            name,
            title,
            description,
            avatar,
            id,
            developer,
            features,
            categories,
            tags
          `)
          .eq('slug', agentSlug)
          .single();
        
        if (fetchError) throw fetchError;
        if (!data) throw new Error('Agent not found');
        
        console.log('Fetched agent data:', data); // Debug log
        setAgent(data);
      } catch (err) {
        console.error('Error fetching agent:', err);
        setError('Failed to load agent');
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [agentSlug]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8 flex items-center justify-center">
          <div className="text-dark-purple">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !agent) {
    return (
      <DashboardLayout>
        <div className="p-8 flex flex-col items-center justify-center">
          <div className="text-dark-purple mb-4">{error || 'Agent not found'}</div>
          <motion.button
            onClick={() => navigate('/dashboard/agents')}
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Return to Agents
          </motion.button>
        </div>
      </DashboardLayout>
    );
  }

  if (agentSlug === 'leadsy') {
    return (
      <DashboardLayout>
        <LeadsyAgent />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex h-full">
        {/* Agent Profile Sidebar - 1/4 width */}
        <div className="w-1/4 bg-seasalt/5 border-r border-dark-purple/10 p-8">
          <div className="flex flex-col items-center text-center">
            {agent.avatar ? (
              <div className="relative w-32 h-32 mb-6">
                <img
                  src={agent.avatar}
                  alt={`${agent.name} Avatar`}
                  className="w-full h-full rounded-full object-cover border-4 border-caribbean-current shadow-lg"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = '/images/Avatar/Avatar.png';
                  }}
                />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-caribbean-current/20 flex items-center justify-center mb-6 border-4 border-caribbean-current/30 shadow-lg">
                <Bot className="w-16 h-16 text-caribbean-current" />
              </div>
            )}
            
            <h1 className="text-2xl font-heading font-bold text-dark-purple mb-2">
              {agent.name}
            </h1>
            
            <h2 className="text-lg text-dark-purple mb-6">
              {agent.title}
            </h2>
            
            <div className="bg-white rounded-lg p-6 shadow-sm w-full">
              <h3 className="text-lg font-heading font-bold text-dark-purple mb-3">
                About
              </h3>
              <p className="text-dark-purple text-sm leading-relaxed">
                {agent.description}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area - 3/4 width */}
        <div className="w-3/4 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-heading font-bold text-dark-purple mb-4">
              Agent Form
            </h2>
            <p className="text-dark-purple mb-6">
              Configure and use this agent's capabilities
            </p>
            {agent.id && <AgentForm agentId={agent.id} formType="scraping" />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AgentPage;