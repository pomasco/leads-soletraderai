import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  icon: string;
}

interface AgentProcessProps {
  steps: Step[];
}

const AgentProcess: React.FC<AgentProcessProps> = ({ steps }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="agent-process" className="bg-dark-purple py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-4xl text-seasalt mb-4">
            How It Works
          </h2>
          <p className="text-xl text-seasalt/80 max-w-2xl mx-auto">
            Follow these simple steps to get started
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-seasalt/5 backdrop-blur-lg rounded-xl p-6 border border-seasalt/10"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-caribbean-current/20 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <h3 className="text-xl font-heading font-bold text-seasalt mb-2">
                  {step.title}
                </h3>
                <p className="text-seasalt/70">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-6 h-6 text-caribbean-current hidden lg:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentProcess;
