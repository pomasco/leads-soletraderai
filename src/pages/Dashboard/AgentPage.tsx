import React from 'react';
import { useParams } from 'react-router-dom';
import LeadsyAgent from './Agents/LeadsyAgent';
import { supabase } from '../../lib/supabase';
import DashboardLayout from '../layouts/DashboardLayout';

const AgentPage: React.FC = () => {
  const { agentId } = useParams();
  const [agent, setAgent] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAgent = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', agentId)
        .single();
      
      if (!error && data) {
        setAgent(data);
      }
      setLoading(false);
    };

    fetchAgent();
  }, [agentId]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <div className="text-seasalt">Loading...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!agent) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <div className="text-seasalt">Agent not found</div>
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