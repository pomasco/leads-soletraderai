-- Add categories column if it doesn't exist
ALTER TABLE public.agents 
ADD COLUMN IF NOT EXISTS categories text[] DEFAULT '{}';

-- Create index for categories search
CREATE INDEX IF NOT EXISTS agents_categories_idx ON public.agents USING GIN (categories);

-- Update existing agents with categories
UPDATE public.agents
SET categories = ARRAY[
  'lead_generation',
  'data_extraction'
]
WHERE slug = 'leadsy';

UPDATE public.agents
SET categories = ARRAY[
  'template',
  'documentation'
]
WHERE slug = 'leadsy-temp';