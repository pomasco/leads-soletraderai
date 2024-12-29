import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, AlertCircle } from 'lucide-react';

interface ComplianceItem {
  title: string;
  description: string;
}

interface AgentComplianceProps {
  items: ComplianceItem[];
}

const AgentCompliance: React.FC<AgentComplianceProps> = ({ items }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="agent-compliance" className="bg-seasalt/5 backdrop-blur-lg py-16">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <Shield className="w-8 h-8 text-celadon" />
            <h2 className="text-2xl font-heading font-bold text-seasalt">
              Compliance & Security
            </h2>
          </div>

          <div className="bg-dark-purple/30 border border-seasalt/10 rounded-xl p-6">
            <div className="flex items-start gap-4 mb-6">
              <AlertCircle className="w-6 h-6 text-celadon flex-shrink-0 mt-1" />
              <p className="text-seasalt/80">
                Please review our compliance guidelines and ensure your use of this agent
                aligns with our terms of service and data protection requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="bg-dark-purple/20 rounded-lg p-6"
                >
                  <h3 className="text-lg font-heading font-bold text-seasalt mb-2">
                    {item.title}
                  </h3>
                  <p className="text-seasalt/70 text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AgentCompliance;