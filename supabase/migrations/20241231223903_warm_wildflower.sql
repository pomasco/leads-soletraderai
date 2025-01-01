-- Add tags column to agents table
ALTER TABLE public.agents 
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- Create index for tags search
CREATE INDEX IF NOT EXISTS agents_tags_idx ON public.agents USING GIN (tags);

-- Update existing agents with tags
UPDATE public.agents
SET tags = ARRAY[
  'leads',
  'google_maps',
  'data_validation',
  'automation',
  'business_growth'
]
WHERE slug = 'leadsy';

UPDATE public.agents
SET tags = ARRAY[
  'template',
  'documentation',
  'reference',
  'design_system',
  'components'
]
WHERE slug = 'leadsy-temp';