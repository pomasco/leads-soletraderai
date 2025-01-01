-- Add process column if it doesn't exist
ALTER TABLE public.agents 
ADD COLUMN IF NOT EXISTS process jsonb DEFAULT '[]';

-- Update Leadsy agent with process steps
UPDATE public.agents
SET process = jsonb_build_array(
  jsonb_build_object(
    'title', 'Define Search',
    'description', 'Enter your keywords and location',
    'icon', '🔍'
  ),
  jsonb_build_object(
    'title', 'Filter Results',
    'description', 'Apply smart filters to refine leads',
    'icon', '🎯'
  ),
  jsonb_build_object(
    'title', 'Validate Data',
    'description', 'Automatic data verification',
    'icon', '✅'
  ),
  jsonb_build_object(
    'title', 'Export Leads',
    'description', 'Download verified leads as CSV',
    'icon', '📥'
  )
)
WHERE slug = 'leadsy';