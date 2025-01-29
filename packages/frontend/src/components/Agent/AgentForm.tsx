import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Loader2 } from 'lucide-react';
import { getAgentForm, type FormConfig } from '../../lib/api/forms';
import ScrapingForm from '../ScrapingForm/ScrapingForm';

interface AgentFormProps {
  agentId: string;
  formType: string;
}

const AgentForm: React.FC<AgentFormProps> = ({ agentId, formType }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formConfig, setFormConfig] = React.useState<FormConfig | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchForm = async () => {
      try {
        const form = await getAgentForm(agentId, formType);
        if (form) {
          setFormConfig(form.config);
        } else {
          setError('Form configuration not found');
        }
      } catch (err) {
        console.error('Error loading form:', err);
        setError('Failed to load form configuration');
      } finally {
        setLoading(false);
      }
    };

    fetchForm();
  }, [agentId, formType]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 text-caribbean-current animate-spin" />
      </div>
    );
  }

  if (error || !formConfig) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">{error || 'Form configuration not available'}</p>
      </div>
    );
  }

  // For now, we'll use the ScrapingForm component
  // In the future, we can make this more dynamic based on form type
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <ScrapingForm config={formConfig} />
    </motion.div>
  );
};

export default AgentForm;