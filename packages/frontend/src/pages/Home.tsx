import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import WaveAnimation from '../components/WaveAnimation';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-purple to-dark-cyan">
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-10 w-72 h-72 bg-caribbean-current rounded-full mix-blend-multiply filter blur-xl opacity-70 -z-10"
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
            className="absolute bottom-1/4 right-10 w-72 h-72 bg-dark-cyan rounded-full mix-blend-multiply filter blur-xl opacity-70 -z-10"
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
        <div className="relative z-10 flex items-center min-h-screen pb-[120px] w-full">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              ref={ref}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-heading text-7xl sm:text-7xl lg:text-8xl xl:text-9xl mb-6 leading-tight font-bold uppercase">
                YOUR BUSINESS,
                <br />
                <div className="relative h-[1.2em] -mb-4">
                  <motion.span
                    className="stroke-text absolute inset-0"
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: scrolled ? 0 : 1, y: scrolled ? -20 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    STREAMLINED
                  </motion.span>
                  <motion.span
                    className="text-celadon absolute inset-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    SUPERCHARGED
                  </motion.span>
                </div>
                BY AI
              </h1>
              <p className="font-heading font-light text-lg sm:text-xl mb-12 max-w-3xl opacity-90">
               Experience the future of work with AI team members that understand your business. AI Employees that seamlessly work within your processes 24/7
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ marginBottom: '3rem' }}
            >
              <Link to="/agents">
                <motion.button
                  className="btn-primary w-48"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Agents
                </motion.button>
              </Link>
              <motion.button
                className="btn-secondary w-48"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToFeatures}
              >
                Learn More
              </motion.button>
            </motion.div>

            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            >
              <ChevronDown 
                className="w-8 h-8 text-seasalt cursor-pointer" 
                onClick={scrollToFeatures}
              />
            </motion.div>
          </div>
        </div>

        <WaveAnimation />
      </section>

      {/* Features Section */}
      <section id="features" className="bg-seasalt py-20">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading font-bold text-4xl sm:text-5xl text-dark-purple mb-6">
              Why Choose Our AI Agents?
            </h2>
            <p className="text-xl text-dark-purple/80">
              Powerful automation tools designed for modern businesses
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-heading font-bold text-dark-purple mb-4">
                Smart Automation
              </h3>
              <p className="text-dark-purple/80">
                Let our AI agents handle repetitive tasks while you focus on growing your business
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-heading font-bold text-dark-purple mb-4">
                Customizable Workflows
              </h3>
              <p className="text-dark-purple/80">
                Tailor each agent's behavior to match your specific business needs
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-heading font-bold text-dark-purple mb-4">
                Seamless Integration
              </h3>
              <p className="text-dark-purple/80">
                Our agents work together seamlessly to create powerful automation workflows
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;