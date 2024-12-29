import React from 'react';
import { motion } from 'framer-motion';
import { Store, Send, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const ComingSoon: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let errorMessage = '';

    try {
      // Check if email already exists
      const { data: exists } = await supabase
        .rpc('check_waitlist_email', { email_address: email });

      if (exists) {
        errorMessage = 'This email is already registered';
        throw new Error(errorMessage);
      }

      const { error } = await supabase
        .from('waitlist')
        .insert([{ 
          email,
          status: 'pending',
          metadata: {
            source: 'coming_soon_page',
            signup_date: new Date().toISOString()
          }
        }]);

      if (error) throw error;
      
      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Error:', error instanceof Error ? error.message : error);
      alert(errorMessage || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-purple to-dark-cyan flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-8">
          <img
            src="/images/Logo/soletraderai-logo-white.png"
            alt="Sole Trader AI"
            className="h-12"
          />
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-6 text-seasalt leading-tight">
          Something <span className="highlight-text">Amazing</span> is Coming Soon
        </h1>

        <p className="text-xl text-seasalt/80 mb-12 max-w-xl mx-auto">
          We're working hard to bring you the ultimate lead generation tool. 
          Sign up to be notified when we launch!
        </p>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-seasalt/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto"
          >
            <div className="w-12 h-12 bg-celadon rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-6 h-6 text-dark-purple" />
            </div>
            <h3 className="text-xl font-heading font-medium text-seasalt mb-2">
              Thank You!
            </h3>
            <p className="text-seasalt/80">
              We'll notify you as soon as we launch.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-lg bg-seasalt/10 backdrop-blur-sm 
                         border-2 border-seasalt/20 text-seasalt placeholder:text-seasalt/50
                         focus:outline-none focus:border-seasalt/50 transition-colors"
              />
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary !mx-0 disabled:opacity-50 disabled:cursor-not-allowed
                         flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Notify Me
                  </>
                )}
              </motion.button>
            </div>
          </form>
        )}

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-seasalt/60">
          <div>
            <h3 className="text-2xl font-heading font-bold text-seasalt mb-2">
              Smart Scraping
            </h3>
            <p>Advanced lead generation from Google Maps</p>
          </div>
          <div>
            <h3 className="text-2xl font-heading font-bold text-seasalt mb-2">
              Verified Data
            </h3>
            <p>Only the most accurate business information</p>
          </div>
          <div>
            <h3 className="text-2xl font-heading font-bold text-seasalt mb-2">
              Easy Export
            </h3>
            <p>Download your leads in CSV format</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;