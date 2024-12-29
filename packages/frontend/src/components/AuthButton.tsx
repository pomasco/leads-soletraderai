import React from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import AuthModal from './AuthModal';

interface User {
  email?: string;
  user_metadata?: {
    full_name?: string;
    name?: string;
    email?: string;
  };
}

const AuthButton: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [credits, setCredits] = React.useState<number>(0);
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  React.useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchCredits(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchCredits(session.user.id);
      } else {
        setUser(null);
        setCredits(0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCredits = async (userId: string) => {
    const { data, error } = await supabase
      .from('credits')
      .select('amount')
      .eq('user_id', userId)
      .single();

    if (data && !error) {
      setCredits(data.amount);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <p className="text-seasalt">
          Welcome, {user.user_metadata?.full_name || user.user_metadata?.name || user.email}!
          <span className="ml-2">
            You have {credits} credits remaining.
          </span>
        </p>
        <motion.button
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Buy Credits
        </motion.button>
        <motion.button
          onClick={handleSignOut}
          className="border-2 border-seasalt text-seasalt px-4 py-2 rounded-lg 
                   hover:bg-seasalt hover:text-dark-purple transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Out
        </motion.button>
      </div>
    );
  }

  return (
    <>
      <motion.button
        onClick={() => setShowAuthModal(true)}
        className="border-2 border-seasalt text-seasalt px-4 py-2 rounded-lg 
                 hover:bg-seasalt hover:text-dark-purple transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Sign In
      </motion.button>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="signin"
        />
      )}
    </>
  );
};

export default AuthButton;