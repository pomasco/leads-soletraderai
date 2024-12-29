import React from 'react';
import { motion } from 'framer-motion';
import { Store, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AuthModal from './AuthModal';

interface NavbarProps {
  scrolled?: boolean;
}

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const [scrolled, setScrolled] = React.useState(false);
  const isHomePage = location.pathname === '/';

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = isHomePage ? window.scrollY > 10 : true;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    setScrolled(!isHomePage); // Set initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/80 backdrop-blur-lg shadow-lg' : isHomePage ? '' : 'bg-white/80 backdrop-blur-lg shadow-lg'
    }`}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={scrolled || !isHomePage ? "/images/Logo/soletraderai-logo-black.png" : "/images/Logo/soletraderai-logo-white.png"}
              alt="Sole Trader AI"
              className="h-12"
            />
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <motion.a
              href="/agents"
              className={`nav-link ${scrolled ? 'text-dark-purple hover:text-caribbean-current' : 'text-seasalt hover:text-celadon'}`}
              whileHover={{ scale: 1.05 }}
            >
              Agents
            </motion.a>
            <motion.a
              href="/pricing"
              className={`nav-link ${scrolled ? 'text-dark-purple hover:text-caribbean-current' : 'text-seasalt hover:text-celadon'}`}
              whileHover={{ scale: 1.05 }}
            >
              Pricing
            </motion.a>
            {user && (
              <motion.a
                href="/dashboard"
                className={`nav-link ${scrolled ? 'text-dark-purple hover:text-caribbean-current' : 'text-seasalt hover:text-celadon'}`}
                whileHover={{ scale: 1.05 }}
              >
                Dashboard
              </motion.a>
            )}
          </div>

          {/* Auth Button */}
          <div className="flex items-center gap-4">
            {user ? (
              <motion.button
                onClick={() => supabase.auth.signOut()}
                className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full
                         ${scrolled ? 'text-caribbean-current hover:text-dark-purple' : 'text-celadon hover:text-seasalt'}
                         transition-colors`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-5 h-5" />
                Sign Out
              </motion.button>
            ) : (
              <>
                <motion.button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsSignUp(false);
                  }}
                  className={`flex items-center gap-2 text-sm px-3 py-1 rounded-full
                           ${scrolled ? 'text-dark-purple hover:text-caribbean-current' : 'text-seasalt hover:text-celadon'}
                           transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
                <motion.button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsSignUp(true);
                  }}
                  className={`flex items-center gap-2 border text-sm px-3 py-1 rounded-full
                           ${scrolled 
                             ? 'border-caribbean-current text-caribbean-current hover:bg-caribbean-current hover:text-white' 
                             : 'border-celadon text-celadon hover:bg-celadon hover:text-dark-purple'}
                           transition-colors`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode={isSignUp ? 'signup' : 'signin'}
        />
      )}
    </nav>
  );
};

export default Navigation;