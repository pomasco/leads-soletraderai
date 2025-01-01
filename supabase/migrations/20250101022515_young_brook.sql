/*
  # Add Services Schema to Agents Table
  
  1. Changes
    - Add services column to agents table with JSONB type
    - Update existing agents with service data
    - Add index for better query performance
  
  2. Schema Structure
    services: [
      {
        title: string,
        description: string,
        features: string[]
      }
    ]
*/

-- Add services column if it doesn't exist
ALTER TABLE public.agents 
ADD COLUMN IF NOT EXISTS services jsonb DEFAULT '[]';

-- Create index for services search
CREATE INDEX IF NOT EXISTS agents_services_idx ON public.agents USING GIN (services);

-- Update Leadsy agent with services
UPDATE public.agents
SET services = jsonb_build_array(
  jsonb_build_object(
    'title', 'Lead Generation',
    'description', 'Automated lead generation from Google Maps with smart filtering.',
    'features', array['Business contact information', 'Location-based targeting', 'Industry-specific searches']
  ),
  jsonb_build_object(
    'title', 'Data Validation',
    'description', 'Ensure accuracy with our advanced validation system.',
    'features', array['Email verification', 'Phone number validation', 'Address confirmation']
  ),
  jsonb_build_object(
    'title', 'Export & Integration',
    'description', 'Seamlessly export and integrate your leads.',
    'features', array['CSV export', 'CRM integration', 'API access']
  )
)
WHERE slug = 'leadsy';

-- Update Template agent with services
UPDATE public.agents
SET services = jsonb_build_array(
  jsonb_build_object(
    'title', 'Template Structure',
    'description', 'Standard layout and component organization.',
    'features', array['Consistent layout', 'Component hierarchy', 'Design patterns']
  ),
  jsonb_build_object(
    'title', 'Component Library',
    'description', 'Reusable UI components with documentation.',
    'features', array['UI components', 'Usage examples', 'Props documentation']
  ),
  jsonb_build_object(
    'title', 'Design System',
    'description', 'Comprehensive design guidelines and styles.',
    'features', array['Color system', 'Typography', 'Spacing rules']
  )
)
WHERE slug = 'leadsy-temp';