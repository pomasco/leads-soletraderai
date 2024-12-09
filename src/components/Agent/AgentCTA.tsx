import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Zap } from 'lucide-react';

const AgentCTA: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="agent-cta" className="bg-gradient-to-br from-dark-purple to-caribbean-current py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-seasalt/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 max-w-4xl mx-auto 
                   border border-seasalt/20 text-center"
        >
          <div className="w-16 h-16 bg-celadon rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-dark-purple" />
          </div>

          <h2 className="font-heading font-bold text-4xl text-seasalt mb-4">
            Ready to Get Started?
          </h2>
          
          <p className="text-xl text-seasalt/80 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using our AI agent to grow their success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="btn-primary flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AgentCTA;