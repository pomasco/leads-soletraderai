import React from 'react';
import { Bot } from 'lucide-react';
import AgentTemplate from './AgentTemplate';
import ScrapingForm from '../../components/ScrapingForm/ScrapingForm';
import HowItWorks from '../../components/HowItWorks';
import ContactForm from '../../components/ContactForm';

const LeadsyPage: React.FC = () => {
  const features = [
    'Advanced Google Maps Integration',
    'Smart Lead Filtering',
    'Data Validation & Enrichment',
    'CSV Export Functionality',
    'Real-time Progress Tracking'
  ];

  const mainContent = (
    <>
      <HowItWorks />
      <div className="bg-seasalt py-20">
        <div className="container mx-auto px-4">
          <ScrapingForm />
        </div>
      </div>
      <ContactForm />
    </>
  );

  return (
    <AgentTemplate
      title="Leadsy - Smart Lead Generation"
      description="Generate high-quality leads from Google Maps with intelligent filtering and validation. Perfect for businesses looking to expand their customer base efficiently."
      features={features}
      mainContent={mainContent}
    />
  );
};

export default LeadsyPage;