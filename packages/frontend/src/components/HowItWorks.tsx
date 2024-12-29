import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, CreditCard, Database, Download } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const steps = [
  {
    image: 'https://imgur.com/Mv2kx8T.png',
    title: 'Keywords and Area',
    description: 'Enter up to 5 keywords that define the businesses or services you want to target. Pinpoint your search by selecting the city, state, or specific region you need.'
  },
  {
    image: 'https://imgur.com/8E2BA3m.png',
    title: 'Target Results',
    description: 'Decide how many results you wish to receive. Minimum of 100 results to be selected per run. 1 Credit = 1 Result.'
  },
  {
    image: 'https://imgur.com/nr7LPVZ.png',
    title: 'Start Scraping',
    description: 'Our system gathers your leads in real-time from Google Maps. We retrieve the companies Name, Address, Phone and Email.'
  },
  {
    image: 'https://imgur.com/lD1gOvG.png',
    title: 'Download Results',
    description: 'Receive your leads as a CSV file in your account or via email, ready to be used with your mailing system.'
  }
];

const HowItWorks: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="how-it-works" className="bg-seasalt py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 bg-caribbean-current text-seasalt py-12 rounded-2xl"
        >
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl opacity-90">
            Follow these simple steps to start generating leads
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative mb-6">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-caribbean-current rounded-full flex items-center justify-center text-seasalt font-bold">
                  {index + 1}
                </div>
                <img 
                  src={step.image} 
                  alt={step.title}
                  className="w-full h-48 object-contain"
                />
              </div>
              <h3 className="font-heading font-bold text-xl text-dark-purple mb-2">
                {step.title}
              </h3>
              <p className="text-dark-purple text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;