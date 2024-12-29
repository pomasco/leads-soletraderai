import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Pro',
    price: 2500,
    period: '/month',
    description: "Ideal for those who've already got their website up and running and are seeking assistance to enhance and update it further.",
    features: [
      '3-5 day turnaround',
      'Native Development',
      'Task delivered one-by-one',
      'Dedicated dashboard',
      'Updates via Dashboard & Slack'
    ]
  },
  {
    name: 'Pro Plus',
    price: 3800,
    period: '/month',
    description: "Ideal if you want to build or scale your website fast, with the strategy calls included.",
    features: [
      '1-3 day turnaround',
      'Monthly strategy call',
      'Commercial license',
      'Native Development',
      'Tasks delivered one-by-one',
      'Dedicated dashboard',
      'Updates via Dashboard & Slack'
    ]
  },
  {
    name: 'Custom',
    description: "If these plans don't fit, let's create one that suits. Customize your subscription for a perfect fit, bigger or smaller!",
    customTitle: "Let's Talk!",
    features: [
      'Everything in design & development',
      'Strategy workshop',
      'Priority support',
      'Multiple tasks at once',
      'Ongoing autonomous A/B testing',
      'Advanced custom development'
    ]
  }
];

const PricingTable: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = React.useState<'monthly' | 'quarterly'>('monthly');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedPlan, setSelectedPlan] = React.useState(1); // Pro plan selected by default

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };
  return (
    <section id="pricing" className="bg-seasalt py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-dark-purple mb-4">
            Choose your right plan!
          </h2>
          <p className="text-lg text-dark-purple/80 max-w-3xl mx-auto mb-8">
            Select from best plans, ensuring a perfect match. Need more or less?
            Customize your subscription for a seamless fit!
          </p>
          
          <div className="inline-flex bg-gray-100 rounded-full p-1 mb-12">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-8 py-2 rounded-full text-sm transition-colors ${
                billingPeriod === 'monthly' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('quarterly')}
              className={`px-8 py-2 rounded-full text-sm transition-colors ${
                billingPeriod === 'quarterly' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-gray-600'
              }`}
            >
              Quarterly (save 10%)
            </button>
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-white rounded-3xl p-8 ${
                index === 1 ? 'shadow-xl' : 'shadow-lg'
              } ${
                index === 2 ? 'bg-purple-50' : ''
              }`}
            >
              <div className="mb-8">
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {plan.description}
                </p>
              </div>
              {plan.price ? (
                <div className="mb-8">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="text-gray-500">{plan.period}</span>
                </div>
              ) : (
                <div className="mb-8">
                  <h4 className="text-3xl font-bold">{plan.customTitle}</h4>
                </div>
              )}

              <div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-600 text-sm">
                      <Check className="w-4 h-4 text-purple-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  className={`w-full py-3 rounded-lg text-center transition-colors ${
                    index === 2
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-purple-500 text-white hover:bg-purple-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {index === 2 ? 'Book a Call' : 'Get started'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingTable;