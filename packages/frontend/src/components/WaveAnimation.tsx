import React from 'react';
import { motion } from 'framer-motion';

const WaveAnimation: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full h-[151px] overflow-hidden pointer-events-none">
      {/* Solid white wave on top */}
      <div
        className="absolute bottom-0 left-0 w-full h-[150px]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='M0,120 L0,75 C200,120 400,30 600,75 C800,120 1000,30 1200,75 L1200,120 Z' fill='%23fcfafa'/%3E%3C/svg%3E")`,
          backgroundSize: '1200px 150px',
          animation: 'wave 50s linear infinite',
          zIndex: 1,
        }}
      />
      {/* Semi-transparent wave underneath */}
      <div
        className="absolute bottom-0 left-0 w-full h-[150px]"
        style={{
          bottom: '-5px',
          opacity: 0.4,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='M0,120 L0,75 C200,120 400,30 600,75 C800,120 1000,30 1200,75 L1200,120 Z' fill='%23fcfafa'/%3E%3C/svg%3E")`,
          backgroundSize: '1200px 150px',
          animation: 'wave2 70s linear infinite',
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default WaveAnimation;