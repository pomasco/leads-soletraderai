import React from 'react';
import { motion } from 'framer-motion';

interface KeywordsStepProps {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
}

const KeywordsStep: React.FC<KeywordsStepProps> = ({ keywords, setKeywords }) => {
  const handleChange = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-heading font-medium text-dark-purple">
        Enter up to 5 keywords
      </h3>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <input
              type="text"
              value={keywords[index] || ''}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder={`Keyword ${index + 1}`}
              className="w-full px-4 py-3 rounded-lg border-2 border-caribbean-current/20 
                       placeholder:text-dark-purple/40 focus:border-caribbean-current 
                       focus:outline-none transition-colors text-dark-purple"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default KeywordsStep;