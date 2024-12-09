import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Bot, PlayCircle } from 'lucide-react';

interface AgentHeroProps {
  agentName: string;
  agentTitle: string;
  description: string;
  avatar?: string;
  icon?: React.ReactNode;
  categories?: string[];
  tags?: string[];
}

const AgentHero: React.FC<AgentHeroProps> = ({ 
  agentName,
  agentTitle,
  description, 
  avatar = '/images/Avatar/Avatar.png',
  icon,
  categories = ['Category 1', 'Category 2', 'Category 3'],
  tags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5']
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const categoryStyles = {
    'Category 1': 'bg-red-100 text-red-600 hover:bg-red-200',
    'Category 2': 'bg-green-100 text-green-600 hover:bg-green-200',
    'Category 3': 'bg-purple-100 text-purple-600 hover:bg-purple-200'
  };

  return (
    <section id="agent-hero" className="relative min-h-[80vh] bg-white">
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-12 items-center gap-8 min-h-[80vh]">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="col-span-9"
          >
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-6 uppercase">
              <span className="font-[400] text-dark-purple">Meet&nbsp;</span>
              <span className="font-[500] relative">
                <span className="absolute" style={{
                  WebkitTextStroke: '1px var(--caribbean-current)',
                  color: 'transparent'
                }}>
                  {agentName}
                </span>
                <span className="relative text-caribbean-current">
                  {agentName}
                </span>
              </span>
            </h1>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl mb-6 text-dark-purple">
              {agentTitle}
            </h2>

            <p className="text-xl text-dark-purple mb-12 max-w-2xl">
              {description}
            </p>
            
            <div className="flex flex-wrap gap-6">
              <motion.button
                className="bg-caribbean-current/10 text-caribbean-current px-6 py-3 rounded-lg 
                         flex items-center gap-2 hover:bg-caribbean-current/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="bg-dark-purple/10 text-dark-purple px-6 py-3 rounded-lg
                         hover:bg-dark-purple/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
              <motion.button
                className="bg-caribbean-current/10 text-caribbean-current px-6 py-3 rounded-lg
                         hover:bg-caribbean-current/20 transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PlayCircle className="w-5 h-5" />
                Test {agentName}
              </motion.button>
            </div>
            
            <div className="mt-12 pt-12 border-t border-dark-purple/10">
              <div className="flex items-center gap-8">
                <div className="flex flex-wrap gap-3">
                  {categories.map((category, index) => (
                    <motion.a
                      key={index}
                      href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                               ${categoryStyles[category as keyof typeof categoryStyles]}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category}
                    </motion.a>
                  ))}
                </div>
                
                <div className="h-8 w-px bg-dark-purple/10" />
                
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <motion.a
                      key={index}
                      href={`#${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="px-3 py-1 bg-blue-100 text-blue-600 hover:bg-blue-200 
                               rounded-full text-sm transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tag}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="col-span-3 aspect-square rounded-full overflow-hidden border-4 
                     border-caribbean-current shadow-xl"
          >
            <img
              src={avatar}
              alt="Agent Avatar"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default AgentHero;