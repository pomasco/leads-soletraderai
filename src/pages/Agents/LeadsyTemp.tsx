import React from 'react';
import { Bot, Search, Filter, Download, Target, Users, Clock, Shield } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import AgentHero from '../../components/Agent/AgentHero';
import AgentCompliance from '../../components/Agent/AgentCompliance';
import AgentServices from '../../components/Agent/AgentServices';
import AgentProcess from '../../components/Agent/AgentProcess';
import AgentTutorials from '../../components/Agent/AgentTutorials';
import AgentTest from '../../components/Agent/AgentTest';
import AgentMetrics from '../../components/Agent/AgentMetrics';
import AgentReviews from '../../components/Agent/AgentReviews';
import AgentCTA from '../../components/Agent/AgentCTA';
import ScrapingForm from '../../components/ScrapingForm/ScrapingForm';

const LeadsyTemp: React.FC = () => {
  const complianceItems = [
    {
      title: 'Data Usage Guidelines',
      description: 'Ensure compliance with data protection regulations and use gathered information responsibly.'
    },
    {
      title: 'Terms of Service',
      description: 'Review our terms of service for detailed information about usage limits and restrictions.'
    }
  ];

  const services = [
    {
      title: 'Lead Generation',
      description: 'Automated lead generation from Google Maps with smart filtering.',
      features: [
        'Business contact information',
        'Location-based targeting',
        'Industry-specific searches'
      ]
    },
    {
      title: 'Data Validation',
      description: 'Ensure accuracy with our advanced validation system.',
      features: [
        'Email verification',
        'Phone number validation',
        'Address confirmation'
      ]
    },
    {
      title: 'Export & Integration',
      description: 'Seamlessly export and integrate your leads.',
      features: [
        'CSV export',
        'CRM integration',
        'API access'
      ]
    }
  ];

  const processSteps = [
    {
      title: 'Define Search',
      description: 'Enter your keywords and location',
      icon: <Search className="w-6 h-6 text-caribbean-current" />
    },
    {
      title: 'Filter Results',
      description: 'Apply smart filters to refine leads',
      icon: <Filter className="w-6 h-6 text-caribbean-current" />
    },
    {
      title: 'Validate Data',
      description: 'Automatic data verification',
      icon: <Target className="w-6 h-6 text-caribbean-current" />
    },
    {
      title: 'Export Leads',
      description: 'Download verified leads as CSV',
      icon: <Download className="w-6 h-6 text-caribbean-current" />
    }
  ];

  const tutorials = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of using Leadsy',
      duration: '5 min',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800',
      videoUrl: '#'
    },
    {
      title: 'Advanced Filtering',
      description: 'Master the art of lead filtering',
      duration: '8 min',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800',
      videoUrl: '#'
    },
    {
      title: 'Export & Integration',
      description: 'Connect with your favorite tools',
      duration: '6 min',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800',
      videoUrl: '#'
    }
  ];

  const reviews = [
    {
      author: 'Sarah Johnson',
      company: 'Marketing Solutions Inc.',
      content: 'Leadsy has transformed how we generate leads. The accuracy and efficiency are outstanding.',
      rating: 5
    },
    {
      author: 'Michael Chen',
      company: 'Growth Dynamics',
      content: 'The smart filtering feature saves us hours of manual work. Highly recommended!',
      rating: 5
    },
    {
      author: 'Emma Williams',
      company: 'Sales Pro Group',
      content: 'Best lead generation tool we have used. The validation feature is a game-changer.',
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <AgentHero
        agentName="Leadsy"
        agentTitle="Lead Generation Specialist"
        description="Transform your business growth with AI-powered lead generation from Google Maps. Get verified business contacts with smart filtering and validation."
        icon={<Bot className="w-10 h-10 text-caribbean-current" />}
      />
      
      <AgentCompliance items={complianceItems} />
      <AgentServices services={services} />
      <AgentProcess steps={processSteps} />
      <AgentTutorials tutorials={tutorials} />
      <AgentTest />
      <AgentMetrics />
      <AgentReviews reviews={reviews} />
      <AgentCTA />
      
      <Footer />
    </div>
  );
};

export default LeadsyTemp;