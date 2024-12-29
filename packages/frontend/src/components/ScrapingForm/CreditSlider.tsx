import React from 'react';
import { motion } from 'framer-motion';

interface CreditSliderProps {
  credits: number;
  setCredits: (credits: number) => void;
  maxCredits: number;
}

const CreditSlider: React.FC<CreditSliderProps> = ({ credits, setCredits, maxCredits }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredits(Number(e.target.value));
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-2xl font-semibold text-dark-purple">
          {credits.toLocaleString()}
        </span>
        <span className="text-sm text-dark-purple/60">
          Max: {maxCredits.toLocaleString()}
        </span>
      </div>
      <input
        type="range"
        min="100"
        max={maxCredits}
        step="100"
        value={credits}
        onChange={handleChange}
        className="w-full h-2 bg-caribbean-current/10 rounded-full appearance-none cursor-pointer
                 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
                 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-caribbean-current 
                 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                 [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-200
                 [&::-webkit-slider-thumb]:hover:scale-125"
      />
      <div className="flex justify-between text-sm text-dark-purple/60">
        <span>100 credits</span>
        <span>{maxCredits.toLocaleString()} credits</span>
      </div>
    </div>
  );
};

export default CreditSlider;