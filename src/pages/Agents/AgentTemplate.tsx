import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useParams, useNavigate } from 'react-router-dom';
import { useAgent } from '../../hooks/useAgent';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';

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
  
  console.log('Agent process data:', agent.process);

      {agent.process && agent.process.length > 0 && (
        <AgentProcess steps={agent.process} />
      )}
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-6 text-seasalt">
              {agent.name}
            </h1>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-3xl mb-6 text-seasalt">
              {agent.title}
            </h2>
            <p className="text-xl text-seasalt/80 mb-12 max-w-2xl">
              {agent.long_description || agent.short_description}
            </p>
            
            <div className="flex flex-wrap gap-6">
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.button>
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-10 w-72 h-72 bg-caribbean-current rounded-full 
                     mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-10 w-72 h-72 bg-dark-cyan rounded-full 
                     mix-blend-multiply filter blur-xl opacity-70"
            animate={{
              scale: [1, 1.2, 1],
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1,
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-seasalt py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading font-bold text-4xl text-dark-purple mb-6">
              Key Features
            </h2>
            <p className="text-xl text-dark-purple/80">
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
                <h3 className="text-xl font-heading font-bold text-dark-purple mb-4">
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