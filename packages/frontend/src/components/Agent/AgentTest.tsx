import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { TestScrapingForm } from '../TestScrapingForm';
import AuthModal from '../AuthModal';

interface AgentTestProps {
  agentName: string;
}

const AgentTest: React.FC<AgentTestProps> = ({ agentName }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [hasTestCredits, setHasTestCredits] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      setUser(session?.user ?? null);
      
      if (session?.user) {
        try {
          const { data: testSearch, error } = await supabase
          .from('test_searches')
          .select('last_used')
          .eq('user_id', session.user.id)
          .maybeSingle();

          if (error) {
            console.error('Error checking test search status:', error);
            setHasTestCredits(false);
            return;
          }

          if (!testSearch) {
          setHasTestCredits(true);
            return;
          }

          const oneMonthAgo = new Date();
          oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
          setHasTestCredits(new Date(testSearch.last_used) < oneMonthAgo);
        } catch (error) {
          console.error('Error in test search check:', error);
          setHasTestCredits(false);
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  return (
    <section id="agent-test" className="bg-gradient-to-br from-dark-purple to-caribbean-current py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="bg-seasalt/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 max-w-4xl mx-auto 
                   border border-seasalt/20"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-celadon rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-dark-purple" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-seasalt">
              Try It Free
            </h2>
          </div>

          <p className="text-seasalt/80 mb-8 text-lg">
            Experience the power of our AI agent with a free test. No credit card required.
          </p>

          {loading ? (
            <div className="text-center text-seasalt/60">Loading...</div>
          ) : user ? (
            hasTestCredits ? (
              <TestScrapingForm />
            ) : (
              <div className="text-center">
                <p className="text-seasalt/80 mb-4">
                  You've already used your free test this month.
                </p>
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Upgrade to Continue
                </motion.button>
              </div>
            )
          ) : (
            <>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-celadon rounded-full" />
                <span className="text-seasalt">10 free searches per month</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-celadon rounded-full" />
                <span className="text-seasalt">No credit card needed</span>
              </div>
            </div>

            <div className="mt-8">
              <motion.button
                onClick={() => setShowAuthModal(true)}
                className="btn-primary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Log in to test {agentName}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
            
            {showAuthModal && (
              <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
                initialMode="signin"
              />
            )}
          </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default AgentTest;