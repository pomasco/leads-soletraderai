import React from 'react';
import { motion } from 'framer-motion';

interface ResultsStepProps {
  results: number;
  setResults: (results: number) => void;
}

const ResultsStep: React.FC<ResultsStepProps> = ({ results, setResults }) => {
  const handleChange = (value: string) => {
    const num = parseInt(value);
    if (num >= 100) {
      setResults(Math.floor(num / 100) * 100);
    } else {
      setResults(100);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-heading font-medium text-dark-purple">
        How many results do you need?
      </h3>
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <input
              type="number"
              min="100"
              step="100"
              value={results}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-caribbean-current/20 
                       focus:border-caribbean-current focus:outline-none transition-colors
                       text-dark-purple"
            />
            <span className="text-dark-purple font-medium">results</span>
          </div>
          <p className="mt-2 text-sm text-dark-purple/60">
            Minimum 100 results required. Results are provided in increments of 100.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsStep;