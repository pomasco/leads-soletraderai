import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Loader2 } from 'lucide-react';
import WaveAnimation from './WaveAnimation';
import AuthModal from './AuthModal';
import TestScrapingForm from './TestScrapingForm/TestScrapingForm';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [isEmploying, setIsEmploying] = React.useState(false);
  const [showTestForm, setShowTestForm] = React.useState(false);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTestForm = () => {
    const element = document.getElementById('scraping-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-10 w-72 h-72 bg-caribbean-current rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-10 w-72 h-72 bg-dark-cyan rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 pb-[120px]">
        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            initialMode={isSignUp ? 'signup' : 'signin'}
          />
        )}
        <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
            Find Leads <span className="highlight-text">Faster</span>, <span className="highlight-text">Smarter</span>, and <span className="highlight-text">Effortlessly</span>.
          </h1>
          <p className="font-heading font-light text-xl sm:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
            Scrape verified leads from Google Maps in minutes and grow your business with precision.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ marginBottom: '3rem' }}
        >
          {isEmploying ? (
            <motion.button
              className="btn-primary w-48 flex items-center justify-center gap-2"
              disabled
            >
              <Loader2 className="w-5 h-5 animate-spin" />
              Employing...
            </motion.button>
          ) : (
            <motion.button
              className="btn-primary w-48"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={async () => {
                if (!user) {
                  setIsSignUp(true);
                  setShowAuthModal(true);
                } else {
                  setIsEmploying(true);
                  try {
                    // Check if agent is already employed
                    const { data: existingAgent, error: checkError } = await supabase
                      .from('user_agents')
                      .select()
                      .match({ user_id: user.id, agent_id: 'leadsy' });

                    if (checkError) throw checkError;

                    if (!existingAgent || existingAgent.length === 0) {
                      // Add Leadsy agent to user's dashboard
                      const { error: insertError } = await supabase
                        .from('user_agents')
                        .insert([{
                          user_id: user.id,
                          agent_id: 'leadsy',
                          settings: {},
                          is_active: true,
                          last_used: new Date().toISOString(),
                          created_at: new Date().toISOString()
                        }]);
                      
                      if (insertError) throw insertError;
                    } else {
                      // Agent already exists, just update last_used
                      const { error: updateError } = await supabase
                        .from('user_agents')
                        .update({ last_used: new Date().toISOString() })
                        .match({ user_id: user.id, agent_id: 'leadsy' });

                      if (updateError) throw updateError;
                    }
                    
                    // Ensure navigation happens after successful database operation
                    // Use navigate for smoother transition
                    navigate('/dashboard/agents/leadsy');
                  } catch (error) {
                    console.error('Error employing agent:', error);
                    const errorMessage = error instanceof Error 
                      ? `Failed to employ agent: ${error.message}`
                      : 'Failed to employ agent. Please try again.';
                    alert(errorMessage);
                  } finally {
                    setIsEmploying(false);
                  }
                }
              }
            }
            >
              {user ? 'Employ Agent' : 'Get Started Now'}
            </motion.button>
          )}
          <motion.button
            className="btn-secondary w-48"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToHowItWorks}
          >
            Learn More
          </motion.button>
          <motion.button
            className="btn-secondary w-48"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTestForm}
          >
            Try it Free
          </motion.button>
        </motion.div>

        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
          <ChevronDown className="w-8 h-8 text-seasalt cursor-pointer" onClick={scrollToHowItWorks} />
        </motion.div>
        </div>
      </div>

      {/* Wave Animation */}
      <WaveAnimation />
    </section>
  );
};

export default Hero;