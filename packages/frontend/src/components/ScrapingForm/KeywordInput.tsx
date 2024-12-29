import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface KeywordInputProps {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
}

const KeywordInput: React.FC<KeywordInputProps> = ({ keywords, setKeywords }) => {
  const [input, setInput] = React.useState('');

  const addKeyword = () => {
    if (input.trim() && keywords.length < 5) {
      setKeywords([...keywords, input.trim()]);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === 'Tab') && input.trim()) {
      e.preventDefault();
      addKeyword();
    }
  };

  const removeKeyword = (indexToRemove: number) => {
    setKeywords(keywords.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="relative flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter or Tab"
          disabled={keywords.length >= 5}
          className="w-full px-4 py-3 rounded-lg border-2 border-caribbean-current/20 
                  focus:border-caribbean-current focus:outline-none transition-colors
                  disabled:bg-gray-50 disabled:cursor-not-allowed text-dark-purple
                  placeholder:text-dark-purple/40"
        />
        <motion.button
          type="button"
          onClick={addKeyword}
          disabled={keywords.length >= 5 || !input.trim()}
          className="px-4 py-2 bg-caribbean-current text-white rounded-lg
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:bg-caribbean-current/90 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Add
        </motion.button>
        {keywords.length >= 5 && (
          <span className="absolute right-3 top-2.5 text-sm text-caribbean-current">
            Max 5 keywords
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, index) => (
          <motion.span
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-caribbean-current/10
                   text-caribbean-current rounded-full text-sm border border-caribbean-current/20"
          >
            {keyword}
            <button
              onClick={() => removeKeyword(index)}
              className="p-0.5 hover:bg-caribbean-current/20 rounded-full transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default KeywordInput;