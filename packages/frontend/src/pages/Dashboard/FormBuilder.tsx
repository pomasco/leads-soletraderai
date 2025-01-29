import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import FormBuilder from '../../components/FormBuilder/FormBuilder';
import { supabase } from '../../lib/supabase';
import type { FormConfig } from '../../lib/formBuilder/types';

const FormBuilderPage: React.FC = () => {
  const { agentId } = useParams<{ agentId: string }>();
  const navigate = useNavigate();
  const [initialConfig, setInitialConfig] = React.useState<FormConfig | undefined>();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchForm = async () => {
      if (!agentId) return;

      try {
        const { data, error } = await supabase
          .from('agent_forms')
          .select('config')
          .eq('agent_id', agentId)
          .single();

        if (error) {
          if (error.code !== 'PGRST116') { // Not found is ok for new forms
            throw error;
          }
        } else if (data) {
          setInitialConfig(data.config);
        }
      } catch (err) {
        console.error('Error fetching form:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [agentId]);

  const handleSave = async (config: FormConfig) => {
    if (!agentId) return;

    const { error } = await supabase
      .from('agent_forms')
      .upsert({
        agent_id: agentId,
        config,
        updated_at: new Date().toISOString()
      });

    if (error) {
      throw error;
    }

    // Navigate back to agent page
    navigate(`/dashboard/agents/${agentId}`);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-8">Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center gap-4 mb-8">
          <motion.button
            onClick={() => navigate(-1)}
            className="text-dark-purple hover:text-caribbean-current transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <h1 className="text-2xl font-heading font-bold text-dark-purple">
            Form Builder
          </h1>
        </div>

        {agentId && (
          <FormBuilder
            agentId={agentId}
            initialConfig={initialConfig}
            onSave={handleSave}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default FormBuilderPage;