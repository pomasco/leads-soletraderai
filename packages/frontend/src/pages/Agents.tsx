import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Filter, Bot, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const defaultAgents = [
  {
    id: 'leadsy',
    name: 'Leadsy',
    description: 'Generate high-quality leads from Google Maps with smart filtering and validation.',
    category: 'lead_generation',
    features: ['Google Maps Integration', 'Smart Filtering', 'Data Validation'],
    icon: Bot
  },
  {
    id: 'leadsy-temp',
    name: 'Leadsy (Template)',
    description: 'Template version of Leadsy with standardized layout and components. Use this as a reference for creating new agent pages.',
    category: 'template',
    features: ['Standard Layout', 'Reusable Components', 'Consistent Styling'],
    icon: Bot
  },
  {
    id: 'contentor',
    name: 'Contentor',
    description: 'Create engaging content optimized for your target audience and SEO.',
    category: 'content',
    features: ['SEO Optimization', 'Multi-format Content', 'Brand Voice Learning'],
    icon: Sparkles
  },
  {
    id: 'analytica',
    name: 'Analytica',
    description: 'Transform your data into actionable insights with real-time AI analytics.',
    category: 'analytics',
    features: ['Real-time Monitoring', 'Predictive Analytics', 'Custom Reports'],
    icon: Zap
  }
];

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  features?: string[];
  icon?: any;
}

const Agents: React.FC = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [agents, setAgents] = React.useState<Agent[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  React.useEffect(() => {
    setAgents(defaultAgents);
    setLoading(false);
  }, []);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(agents.map(agent => agent.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-purple to-dark-cyan">
      <Navigation />
      <div className="pt-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center py-20 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 text-seasalt">
            Our <span className="highlight-text">AI Agents</span>
          </h1>
          <p className="text-xl text-seasalt/80 max-w-3xl mx-auto">
            Discover our collection of specialized AI agents designed to help your business grow
          </p>
        </motion.div>

        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-seasalt/40" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search agents..."
                className="w-full pl-10 pr-4 py-3 bg-seasalt/5 border border-seasalt/10 rounded-lg
                         text-seasalt placeholder:text-seasalt/40 focus:outline-none focus:border-seasalt/20"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-seasalt/40" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 bg-seasalt/5 border border-seasalt/10 rounded-lg
                         text-seasalt appearance-none cursor-pointer focus:outline-none focus:border-seasalt/20"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-seasalt/60">Loading agents...</p>
            </div>
          ) : filteredAgents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-seasalt/60">No agents found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <motion.article
                  key={agent.id}
                  className="group bg-seasalt/5 backdrop-blur-lg rounded-xl p-8 cursor-pointer 
                           border border-seasalt/10 hover:border-seasalt/20 transition-all
                           hover:bg-seasalt/10"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate(`/agents/${agent.id}`)} 
                >
                  <div className="mb-6">
                    <div className="w-14 h-14 bg-caribbean-current/20 rounded-xl flex items-center 
                                justify-center mb-4">
                      {agent.icon && <agent.icon className="w-7 h-7 text-caribbean-current" />}
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-seasalt mb-2">
                      {agent.name}
                    </h3>
                    <p className="text-seasalt/60 text-base leading-relaxed">
                      {agent.description}
                    </p>
                  </div>
                  
                  {agent.features && (
                    <ul className="space-y-2 mb-6">
                      {agent.features.map((feature, idx) => (
                        <li key={idx} className="text-seasalt/70 text-sm flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-celadon rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="flex items-center gap-2 text-celadon font-medium group-hover:gap-3 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Agents;