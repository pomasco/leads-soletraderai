import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useParams, useNavigate } from 'react-router-dom';
import { useAgent } from '../../hooks/useAgent';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import LoadingSpinner from '../../components/LoadingSpinner';
import AgentHero from '../../components/Agent/AgentHero';
import AgentServices from '../../components/Agent/AgentServices';
import AgentMetrics from '../../components/Agent/AgentMetrics';
import AgentProcess from '../../components/Agent/AgentProcess';
import AgentCompliance from '../../components/Agent/AgentCompliance';
import AgentReviews from '../../components/Agent/AgentReviews';
import AgentTest from '../../components/Agent/AgentTest';

const AgentTemplate: React.FC = () => {
  const { agentSlug } = useParams<{ agentSlug: string }>();
  const navigate = useNavigate();
  const { agent, loading, error } = useAgent(agentSlug || '');
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Handle navigation after data is loaded
  React.useEffect(() => {
    if (!loading && (error || !agent)) {
      navigate('/agents', { replace: true });
    }
  }, [agent, loading, error, navigate]);

  // Show loading state while fetching
  if (loading) {
    return <LoadingSpinner />;
  }

  // Return null if no agent (will trigger navigation)
  if (!agent) {
    return null;
  }

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
      />

      <AgentServices
        services={agent.services || []}
      />
      
      <AgentProcess
        steps={agent.process || []}
      />
      
      <AgentMetrics />

      <AgentCompliance
        items={[
          {
            title: 'Data Usage Guidelines',
            description: 'Ensure compliance with data protection regulations and use gathered information responsibly.'
          },
          {
            title: 'Terms of Service',
            description: 'Review our terms of service for detailed information about usage limits and restrictions.'
          }
        ]}
      />

      <AgentReviews
        reviews={[
          {
            author: 'Sarah Johnson',
            company: 'Marketing Solutions Inc.',
            content: 'Leadsy has transformed how we generate leads. The accuracy and efficiency are outstanding.',
            rating: 5
          },
          {
            author: 'Michael Chen',
            company: 'Growth Dynamics',
            content: 'The smart filtering feature saves us hours of manual work. Highly recommended!',
            rating: 5
          },
          {
            author: 'Emma Williams',
            company: 'Sales Pro Group',
            content: 'Best lead generation tool we have used. The validation feature is a game-changer.',
            rating: 4
          }
        ]}
      />

      <AgentTest agentName={agent.name} />

      <Footer />
    </div>
  );
};

export default AgentTemplate;