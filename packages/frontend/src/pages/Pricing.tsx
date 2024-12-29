import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navigation from '../components/Navigation';
import PricingTable from '../components/PricingTable';
import Footer from '../components/Footer';

const Pricing: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-purple to-dark-cyan">
      <Navigation />
      <div className="pt-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center py-20 px-4"
        >
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 text-seasalt">
            Simple, Transparent <span className="highlight-text">Pricing</span>
          </h1>
          <p className="text-xl text-seasalt/80 max-w-3xl mx-auto">
            Choose the plan that works best for your business needs
          </p>
        </motion.div>
        <PricingTable />
      </div>
      <Footer />
    </div>
  );
};

export default Pricing;