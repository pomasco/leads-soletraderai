import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Loader2 } from 'lucide-react';
import DashboardLayout from '../layouts/DashboardLayout';
import { supabase } from '../../lib/supabase';

const DashboardContact: React.FC = () => {
  const [formState, setFormState] = React.useState({
    title: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Here you would typically make an API call to your email service
      // For now, we'll simulate sending an email
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Send email using mailto link
      const emailBody = `
Title: ${formState.title}
Message: ${formState.message}
From: ${user?.email}
Name: ${user?.user_metadata?.full_name || 'Anonymous'}
      `.trim();

      window.location.href = `mailto:hello@soletrader.ai?subject=${encodeURIComponent(formState.title)}&body=${encodeURIComponent(emailBody)}`;

      setSubmitted(true);
      setFormState({ title: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-dark-purple mb-2">
              Contact Us
            </h1>
            <p className="text-dark-purple/60">
              Have questions or need assistance? We're here to help!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-dark-purple/10 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-caribbean-current/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-caribbean-current" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-dark-purple">Email Us</h3>
                    <a 
                      href="mailto:hello@soletrader.ai" 
                      className="text-dark-purple/80 hover:text-caribbean-current transition-colors"
                    >
                      hello@soletrader.ai
                    </a>
                  </div>
                </div>
                <p className="text-dark-purple/60 text-sm">
                  Our team typically responds within 24 hours during business days.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-dark-purple/10 rounded-xl p-6 shadow-sm">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-celadon rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-dark-purple" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-dark-purple mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-dark-purple/60">
                      Thank you for reaching out. We'll be in touch shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-dark-purple mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formState.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white border border-dark-purple/20 rounded-lg
                                 text-dark-purple placeholder:text-dark-purple/40 focus:outline-none
                                 focus:border-caribbean-current transition-colors"
                        placeholder="What's your message about?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-dark-purple mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-white border border-dark-purple/20 rounded-lg
                                 text-dark-purple placeholder:text-dark-purple/40 focus:outline-none
                                 focus:border-caribbean-current transition-colors resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary flex items-center justify-center gap-2
                               disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardContact;