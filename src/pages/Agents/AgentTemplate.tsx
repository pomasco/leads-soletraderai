import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useParams, useNavigate } from 'react-router-dom';
import { useAgent } from '../../hooks/useAgent';
import Navigation from '../../components/Navigation';
import AgentProcess from '../../components/Agent/AgentProcess';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';
import AgentHero from '../../components/Agent/AgentHero';

const AgentTemplate: React.FC = () => {
  const { agentSlug } = useParams<{ agentSlug: string }>();
  const navigate = useNavigate();
  const { agent, isLoading, isError } = useAgent(agentSlug || '');
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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
        agentId={agent.id}
        description={agent.long_description || agent.short_description}
        avatar={agent.avatar}
        categories={agent.categories || []}
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

      <Footer />
    </div>
  );
};

export default AgentTemplate;