import React from 'react';
import { motion } from 'framer-motion';

interface AuthOverlayProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

const AuthOverlay: React.FC<AuthOverlayProps> = ({ onSignIn, onSignUp }) => {
  return (
    <div className="absolute inset-0 backdrop-blur-md bg-dark-purple/50 
                    flex flex-col items-center justify-center z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl font-heading font-bold text-dark-purple mb-4">
          Sign In to Access Lead Generation
        </h3>
        <p className="text-dark-purple max-w-md mx-auto">
          Create an account or sign in to start generating leads for your business
        </p>
      </motion.div>
      
      <div className="flex gap-4">
        <motion.button
          onClick={onSignIn}
          className="border-2 border-dark-purple text-dark-purple px-6 py-3 rounded-lg
                   hover:bg-dark-purple hover:text-seasalt transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign In
        </motion.button>
        
        <motion.button
          onClick={onSignUp}
          className="bg-caribbean-current text-seasalt px-6 py-3 rounded-lg
                   hover:bg-celadon hover:text-dark-purple transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Account
        </motion.button>
      </div>
    </div>
  );
};

export default AuthOverlay;