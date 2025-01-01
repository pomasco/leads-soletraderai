import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-purple to-dark-cyan flex items-center justify-center">
      <Loader2 className="w-12 h-12 text-seasalt animate-spin" />
    </div>
  );
};

export default LoadingSpinner;