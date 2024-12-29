import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play, Clock } from 'lucide-react';

interface Tutorial {
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

interface AgentTutorialsProps {
  tutorials: Tutorial[];
}

const AgentTutorials: React.FC<AgentTutorialsProps> = ({ tutorials }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="agent-tutorials" className="bg-seasalt py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-4xl text-dark-purple mb-4">
            Video Tutorials
          </h2>
          <p className="text-xl text-dark-purple/80 max-w-2xl mx-auto">
            Learn how to make the most of your agent with our detailed tutorials
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={tutorial.thumbnail}
                  alt={tutorial.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-dark-purple/60 flex items-center justify-center 
                             opacity-0 group-hover:opacity-100 transition-opacity">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-12 h-12 bg-caribbean-current rounded-full flex items-center 
                             justify-center"
                  >
                    <Play className="w-6 h-6 text-seasalt" />
                  </motion.div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-dark-purple mb-2">
                  {tutorial.title}
                </h3>
                <p className="text-dark-purple/80 mb-4">
                  {tutorial.description}
                </p>
                <div className="flex items-center gap-2 text-dark-purple/60">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{tutorial.duration}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentTutorials;