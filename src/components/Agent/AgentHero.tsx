import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bot, PlayCircle, Loader2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import AuthModal from '../AuthModal';

interface AgentHeroProps {
  agentName: string;
  agentTitle: string;
  description: string;
  avatar: string;
  categories: string[];
  tags: string[];
  developer: string;
  isEmploying: boolean;
  hasAgent: boolean;
  onEmploy: () => void;
}

const AgentHero: React.FC<AgentHeroProps> = ({ 
  agentName,
  agentTitle,
  description, 
  avatar,
  categories,
  tags,
  developer,
  isEmploying,
  hasAgent,
  onEmploy
}) => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const categoryStyles = {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    color: 'rgba(0, 0, 0, 0.7)',
    padding: '0.25rem 0.75rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
  };

  return (
    <section id="agent-hero" className="relative min-h-[80vh] bg-white">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <img src={avatar} alt={agentName} className="w-16 h-16 rounded-full" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{agentName}</h1>
                <p className="text-gray-600">{agentTitle}</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{description}</p>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-gray-600 mr-2">Categories:</span>
              {categories.map((category, index) => (
                <span key={index} style={categoryStyles}>
                  {category}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-gray-600 mr-2">Tags:</span>
              {tags.map((tag, index) => (
                <span key={index} style={categoryStyles}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-gray-700">
              <span>Developer: {developer}</span>
            </div>

            <div className="flex flex-wrap gap-6">
              <motion.button
                className="btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onEmploy}
                disabled={isEmploying}
              >
                {isEmploying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Adding {agentName}...
                  </>
                ) : hasAgent ? (
                  <>Use {agentName}</>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Add {agentName} to your team
                  </>
                )}
              </motion.button>

              <motion.button
                className="bg-gray-100 text-gray-800 px-6 py-3 rounded-lg 
                         flex items-center gap-2 hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayCircle className="w-5 h-5" />
                Preview
              </motion.button>
            </div>
          </motion.div>

          <div className="hidden lg:block">
            <img src={avatar} alt={agentName} className="w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentHero;