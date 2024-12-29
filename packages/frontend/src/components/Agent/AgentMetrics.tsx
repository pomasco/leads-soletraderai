import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { TrendingUp, Users, Clock, Target } from 'lucide-react';

interface Metric {
  value: string;
  label: string;
  icon: React.ReactNode;
  change?: string;
}

const defaultMetrics: Metric[] = [
  {
    value: '98%',
    label: 'Accuracy Rate',
    icon: <Target className="w-6 h-6" />,
    change: '+2.3%'
  },
  {
    value: '2.5M+',
    label: 'Leads Generated',
    icon: <Users className="w-6 h-6" />,
    change: '+12.5%'
  },
  {
    value: '1.2s',
    label: 'Average Response',
    icon: <Clock className="w-6 h-6" />,
    change: '-0.3s'
  },
  {
    value: '89%',
    label: 'Success Rate',
    icon: <TrendingUp className="w-6 h-6" />,
    change: '+5.2%'
  }
];

interface AgentMetricsProps {
  metrics?: Metric[];
}

const AgentMetrics: React.FC<AgentMetricsProps> = ({ metrics = defaultMetrics }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="agent-metrics" className="bg-dark-purple py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-4xl text-seasalt mb-4">
            Performance Metrics
          </h2>
          <p className="text-xl text-seasalt/80 max-w-2xl mx-auto">
            Real-time statistics and performance indicators
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-seasalt/5 backdrop-blur-lg rounded-xl p-6 border border-seasalt/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-caribbean-current/20 rounded-xl flex items-center justify-center">
                  {React.cloneElement(metric.icon as React.ReactElement, {
                    className: 'w-6 h-6 text-caribbean-current'
                  })}
                </div>
                {metric.change && (
                  <span className={`text-sm ${
                    metric.change.startsWith('+') ? 'text-celadon' : 'text-red-400'
                  }`}>
                    {metric.change}
                  </span>
                )}
              </div>
              <h3 className="text-3xl font-heading font-bold text-seasalt mb-2">
                {metric.value}
              </h3>
              <p className="text-seasalt/60">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentMetrics;