import React from 'react';
import { motion } from 'framer-motion';
import { Download, Check } from 'lucide-react';

const DownloadStep: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-20 h-20 bg-caribbean-current rounded-full flex items-center justify-center mb-6"
      >
        <Check className="w-10 h-10 text-seasalt" />
      </motion.div>
      
      <h3 className="text-2xl font-heading font-medium text-dark-purple mb-4">
        Your results are ready!
      </h3>
      
      <p className="text-dark-purple/60 mb-8 text-center max-w-md">
        Your lead generation results have been processed and are ready for download.
      </p>
      
      <motion.button
        className="btn-primary flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Download className="w-5 h-5" />
        Download Results
      </motion.button>
    </div>
  );
};

export default DownloadStep;