import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, ArrowRight } from 'lucide-react';

const AgentTest: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="agent-test" className="bg-gradient-to-br from-dark-purple to-caribbean-current py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-seasalt/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 max-w-4xl mx-auto 
                   border border-seasalt/20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-celadon rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-dark-purple" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-seasalt">
              Try It Free
            </h2>
          </div>

          <p className="text-seasalt/80 mb-8 text-lg">
            Experience the power of our AI agent with a free test. No credit card required.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-celadon rounded-full" />
                <span className="text-seasalt">10 free searches per month</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-celadon rounded-full" />
                <span className="text-seasalt">Full feature access</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-celadon rounded-full" />
                <span className="text-seasalt">Export capabilities</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-celadon rounded-full" />
                <span className="text-seasalt">No credit card needed</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-celadon rounded-full" />
                <span className="text-seasalt">Instant access</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-celadon rounded-full" />
                <span className="text-seasalt">Cancel anytime</span>
              </div>
            </div>
          </div>

          <motion.button
            className="btn-primary flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AgentTest;