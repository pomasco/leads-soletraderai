import React from 'react';
import { useParams } from 'react-router-dom';
import LeadsyAgent from './Agents/LeadsyAgent';
import { supabase } from '../../lib/supabase';
import DashboardLayout from '../layouts/DashboardLayout';

const AgentPage: React.FC = () => {
  const { agentId } = useParams();
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

      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', agentId)
        .single();
      
      if (error) {
        console.error('Error fetching agent:', error);
        setError('Failed to load agent');
      } else if (data) {
        setAgent(data);
      } else {
        setError('Agent not found');
      }
      setLoading(false);
    };

    fetchAgent();
  }, [agentId]);

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

  if (agentId === 'leadsy') {
    return (
      <DashboardLayout>
        <LeadsyAgent />
      </DashboardLayout>
    );
  }

  return null;
};

export default AgentPage;