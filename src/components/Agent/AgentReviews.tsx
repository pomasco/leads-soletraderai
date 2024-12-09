import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote } from 'lucide-react';

interface Review {
  author: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

interface AgentReviewsProps {
  reviews: Review[];
}

const AgentReviews: React.FC<AgentReviewsProps> = ({ reviews }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="agent-reviews" className="bg-seasalt py-20">
      <div className="container max-w-7xl mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-4xl text-dark-purple mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-dark-purple max-w-2xl mx-auto">
            Read testimonials from businesses using our AI agent
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-caribbean-current/20" />
              
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <p className="text-dark-purple mb-6">
                "{review.content}"
              </p>

              <div className="flex items-center gap-4">
                {review.avatar ? (
                  <img
                    src={review.avatar}
                    alt={review.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-caribbean-current/20 flex items-center 
                               justify-center text-caribbean-current font-bold">
                    {review.author[0]}
                  </div>
                )}
                <div>
                  <h4 className="font-heading font-bold text-dark-purple">
                    {review.author}
                  </h4>
                  <p className="text-dark-purple text-sm">
                    {review.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentReviews;