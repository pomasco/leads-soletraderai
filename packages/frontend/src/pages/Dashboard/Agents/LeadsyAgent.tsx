import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScrapingForm from '../../../components/ScrapingForm/ScrapingForm';

const LeadsyAgent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header Section */}
      <section id="agent-header" className="bg-dark-purple p-8">
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard/agents')}
            className="cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 text-seasalt hover:text-celadon transition-colors" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-heading font-bold text-seasalt">
              Leadsy
            </h1>
            <p className="text-seasalt/60 text-sm mt-1">
              I scrape Google Maps for potential Business leads
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section id="agent-content" className="bg-white min-h-[calc(100vh-8rem)]">
        <div className="grid grid-cols-4 gap-8 p-8">
          {/* Info Column */}
          <div className="space-y-6">
            <div className="p-6 bg-seasalt rounded-xl">
              <div className="w-12 h-12 bg-caribbean-current/10 rounded-lg flex items-center justify-center mb-4">
                <Bot className="w-6 h-6 text-caribbean-current" />
              </div>
              <h3 className="text-lg font-heading font-bold text-dark-purple mb-2">
                About Leadsy
              </h3>
              <p className="text-dark-purple text-sm">
                Generate high-quality leads from Google Maps with smart filtering and validation.
                Perfect for businesses looking to expand their customer base.
              </p>
            </div>

            <div className="p-6 bg-seasalt rounded-xl">
              <h3 className="text-lg font-heading font-bold text-dark-purple mb-4">
                Features
              </h3>
              <ul className="space-y-3">
                {['Google Maps Integration', 'Smart Filtering', 'Data Validation', 'Export to CSV'].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-dark-purple text-sm">
                    <div className="w-1.5 h-1.5 bg-caribbean-current rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form Columns */}
          <div className="col-span-3">
            <ScrapingForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default LeadsyAgent;