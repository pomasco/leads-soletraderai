import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Database, Download } from 'lucide-react';

interface StepMenuProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

const steps = [
  { icon: Search, label: 'Choose Keywords' },
  { icon: MapPin, label: 'Choose Your Area' },
  { icon: Database, label: 'Choose Results' },
  { icon: Download, label: 'Download Results' }
];

const StepMenu: React.FC<StepMenuProps> = ({ currentStep, onStepClick }) => {
  return (
    <div className="w-64 bg-white rounded-l-2xl p-6 space-y-4">
      {steps.map((step, index) => {
        const isActive = currentStep === index + 1;
        const isPast = currentStep > index + 1;
        
        return (
          <motion.button
            key={index}
            onClick={() => onStepClick(index + 1)}
            className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all ${
              isActive 
                ? 'bg-caribbean-current text-seasalt' 
                : isPast
                  ? 'bg-caribbean-current/20 text-dark-purple'
                  : 'text-dark-purple/60 hover:bg-caribbean-current/10'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!isPast && !isActive}
          >
            <step.icon className={`w-5 h-5 ${isActive ? 'text-seasalt' : 'text-caribbean-current'}`} />
            <span className="text-sm font-medium text-dark-purple">{step.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default StepMenu;