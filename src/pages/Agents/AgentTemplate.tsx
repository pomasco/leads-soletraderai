import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Loader2 } from 'lucide-react';
import { useAgent } from '../../hooks/useAgent';
import { supabase } from '../../lib/supabase';
import Navigation from '../../components/Navigation';
import AgentProcess from '../../components/Agent/AgentProcess';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';
import AgentHero from '../../components/Agent/AgentHero';
import AuthModal from '../../components/AuthModal';

const AgentTemplate: React.FC = () => {
  const { agentSlug } = useParams<{ agentSlug: string }>();
  const navigate = useNavigate();
  const { agent, isLoading, isError } = useAgent(agentSlug || '');
  const [isEmploying, setIsEmploying] = React.useState(false);
  const [hasAgent, setHasAgent] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState('');
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user && agent) {
        checkAgentStatus(session.user.id);
      }
    });
  }, [agent]);

  const checkAgentStatus = async (userId: string) => {
    if (!agent) return;
    
    try {
      const { data: existingAgent } = await supabase
        .from('user_agents')
        .select()
        .match({ user_id: userId, agent_id: agent.id })
        .single();
      
      setHasAgent(!!existingAgent);
    } catch (error) {
      console.error('Error checking agent status:', error);
    }
  };

  const handleEmployAgent = async () => {
    if (hasAgent) {
      navigate(`/dashboard/agents/${agentSlug}`);
      return;
    }

    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setIsEmploying(true);
    try {
      const { error: insertError } = await supabase
        .from('user_agents')
        .insert([{
          user_id: user.id,
          agent_id: agent?.id,
          settings: {},
          is_active: true,
          last_used: new Date().toISOString()
        }]);
      
      if (insertError) throw insertError;
      
      setHasAgent(true);
      setSuccessMessage(`${agent?.name} has been added to your team!`);
      
      // Show success message for 3 seconds before navigating
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Navigate to the agent's dashboard page
      navigate(`/dashboard/agents/${agentSlug}`);
    } catch (error) {
      console.error('Error employing agent:', error);
      alert('Failed to add agent to your team. Please try again.');
    } finally {
      setIsEmploying(false);
    }
  };
  React.useEffect(() => {
    if (!isLoading && (isError || !agent)) {
      navigate('/agents', { replace: true });
    }
  }, [isLoading, isError, agent, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!agent) {
    return null;
  }
  
  console.log('Agent data:', {
    process: agent.process,
    isArray: Array.isArray(agent.process),
    type: typeof agent.process,
    processLength: agent.process?.length
  });
  
  console.log('Agent data:', {
    process: agent.process,
    isArray: Array.isArray(agent.process),
    type: typeof agent.process
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-purple to-dark-cyan">
      <Navigation />
  
      <AgentHero
        agentName={agent.name}
        agentTitle={agent.title}
        description={agent.long_description || agent.short_description}
        avatar={agent.avatar}
        categories={agent.categories || []}
        tags={agent.tags || []}
        developer={agent.developer}
        isEmploying={isEmploying}
        hasAgent={hasAgent}
        onEmploy={handleEmployAgent}
      />

      {/* Process Section */}
      {agent.process && Array.isArray(agent.process) && agent.process.length > 0 && (
        <AgentProcess steps={agent.process} />
      )}

      {/* Features Section */}
      <section className="bg-seasalt py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading font-bold text-4xl text-dark-purple mb-6 text-center">
              Key Features
            </h2>
            <p className="text-xl text-dark-purple/80 text-center">
              Discover what makes our solution unique
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agent.features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-heading font-bold text-dark-purple mb-4 text-center">
                  {feature}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Success Message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-4 right-4 bg-celadon text-dark-purple px-6 py-3 rounded-lg shadow-lg"
          >
            {successMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="signin"
        />
      )}

      <Footer />
    </div>
  );
};

export default AgentTemplate;