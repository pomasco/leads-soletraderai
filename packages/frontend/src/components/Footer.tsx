import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const links = [
    { href: '#', text: 'Privacy Policy' },
    { href: '#', text: 'Terms of Service' },
    { href: '#', text: 'Contact' }
  ];

  return (
    <footer className="bg-dark-purple py-12 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <p className="text-seasalt text-lg mb-4">
                Powered by SoleTrader AI | Helping businesses automate and grow with smarter tools.
              </p>
              <nav className="mb-8">
                <ul className="flex flex-wrap justify-center gap-2 sm:gap-4">
                  {links.map((link, index) => (
                    <React.Fragment key={link.text}>
                      <li>
                        <motion.a
                          href={link.href}
                          className="text-seasalt hover:text-celadon transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          {link.text}
                        </motion.a>
                      </li>
                      {index < links.length - 1 && (
                        <li className="text-dark-cyan">|</li>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </nav>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-seasalt/80 text-sm max-w-3xl mx-auto"
            >
              <p>
                By using our service, you agree to the fair and ethical use of data. 
                SoleTrader AI ensures all data scraped complies with relevant legal 
                standards and is used solely for business purposes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;