import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Contact: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formState, setFormState] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captchaToken) {
      setError('Please complete the reCAPTCHA verification');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Here you would typically make an API call to your backend
      const response = await fetch('YOUR_BACKEND_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formState,
          captchaToken,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setCaptchaToken(null);
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
    <div className="min-h-screen bg-gradient-to-br from-dark-purple to-dark-cyan">
      <Navigation />
      
      <div className="pt-20">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="container max-w-7xl mx-auto px-4 py-16"
        >
          <div className="text-center mb-16">
            <h1 className="font-heading font-bold text-4xl sm:text-5xl text-seasalt mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-seasalt/80 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-seasalt/5 backdrop-blur-lg rounded-xl p-6 border border-seasalt/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-caribbean-current/20 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-caribbean-current" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-seasalt">Email</h3>
                    <a href="mailto:hello@soletrader.ai" className="text-seasalt/80 hover:text-seasalt transition-colors">
                      hello@soletrader.ai
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-seasalt/5 backdrop-blur-lg rounded-xl p-6 border border-seasalt/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-caribbean-current/20 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-caribbean-current" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-seasalt">Phone</h3>
                    <a href="tel:+61000000000" className="text-seasalt/80 hover:text-seasalt transition-colors">
                      +61 0 0000 0000
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-seasalt/5 backdrop-blur-lg rounded-xl p-6 border border-seasalt/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-caribbean-current/20 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-caribbean-current" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-bold text-seasalt">Location</h3>
                    <p className="text-seasalt/80">
                      Sydney, Australia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-seasalt/5 backdrop-blur-lg rounded-xl p-8 border border-seasalt/10">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-celadon rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-dark-purple" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-seasalt mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-seasalt/80">
                      Thank you for reaching out. We'll be in touch shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-seasalt mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-seasalt/5 border border-seasalt/20 rounded-lg
                                   text-seasalt placeholder:text-seasalt/40 focus:outline-none
                                   focus:border-seasalt/40 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-seasalt mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-seasalt/5 border border-seasalt/20 rounded-lg
                                   text-seasalt placeholder:text-seasalt/40 focus:outline-none
                                   focus:border-seasalt/40 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-seasalt mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-seasalt/5 border border-seasalt/20 rounded-lg
                                 text-seasalt placeholder:text-seasalt/40 focus:outline-none
                                 focus:border-seasalt/40 transition-colors"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-seasalt mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-seasalt/5 border border-seasalt/20 rounded-lg
                                 text-seasalt placeholder:text-seasalt/40 focus:outline-none
                                 focus:border-seasalt/40 transition-colors resize-none"
                        placeholder="Your message..."
                      />
                    </div>

                    <div className="flex justify-center">
                      <ReCAPTCHA
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        onChange={(token) => setCaptchaToken(token)}
                        theme="dark"
                      />
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm text-center">{error}</p>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !captchaToken}
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
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;