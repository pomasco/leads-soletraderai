-- Update Leadsy agent
UPDATE public.agents
SET
  name = 'Leadsy',
  title = 'Lead Generation Specialist',
  description = 'Generate high-quality leads from Google Maps with smart filtering and validation.',
  short_description = 'Generate high-quality leads from Google Maps with smart filtering and validation.',
  long_description = 'Transform your lead generation process with Leadsy, our advanced AI agent that seamlessly integrates with Google Maps to discover and validate potential business leads.',
  features = ARRAY[
    'Advanced Google Maps Integration',
    'Smart Lead Filtering',
    'Data Validation & Enrichment',
    'CSV Export Functionality',
    'Real-time Progress Tracking'
  ],
  icon = 'users',
  credit_cost = 1,
  category = 'lead_generation',
  developer = 'Sole Trader AI',
  avatar = 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=300'
WHERE slug = 'leadsy';

-- Insert if not exists
INSERT INTO public.agents (
  slug,
  name,
  title,
  description,
  short_description,
  long_description,
  features,
  icon,
  credit_cost,
  category,
  developer,
  avatar
)
SELECT
  'leadsy',
  'Leadsy',
  'Lead Generation Specialist',
  'Generate high-quality leads from Google Maps with smart filtering and validation.',
  'Generate high-quality leads from Google Maps with smart filtering and validation.',
  'Transform your lead generation process with Leadsy, our advanced AI agent that seamlessly integrates with Google Maps to discover and validate potential business leads.',
  ARRAY[
    'Advanced Google Maps Integration',
    'Smart Lead Filtering',
    'Data Validation & Enrichment',
    'CSV Export Functionality',
    'Real-time Progress Tracking'
  ],
  'users',
  1,
  'lead_generation',
  'Sole Trader AI',
  'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=300'
WHERE NOT EXISTS (
  SELECT 1 FROM public.agents WHERE slug = 'leadsy'
);