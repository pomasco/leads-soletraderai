/*
  # Add Process Steps Schema
  
  1. New Columns
    - `process` - JSONB array storing process steps with:
      - title (string)
      - description (string)
      - icon (string)
  
  2. Changes
    - Add process column to agents table
    - Create GIN index for process search
    - Update existing agents with process data
*/

-- Add process column if it doesn't exist
ALTER TABLE public.agents 
ADD COLUMN IF NOT EXISTS process jsonb DEFAULT '[]';

-- Create index for process search
CREATE INDEX IF NOT EXISTS agents_process_idx ON public.agents USING GIN (process);

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

-- Update Template agent with process steps
UPDATE public.agents
SET process = jsonb_build_array(
  jsonb_build_object(
    'title', 'Setup Template',
    'description', 'Initialize the template structure',
    'icon', '📋'
  ),
  jsonb_build_object(
    'title', 'Add Components',
    'description', 'Implement required UI components',
    'icon', '🧩'
  ),
  jsonb_build_object(
    'title', 'Style Guide',
    'description', 'Apply consistent styling rules',
    'icon', '🎨'
  ),
  jsonb_build_object(
    'title', 'Documentation',
    'description', 'Add comprehensive documentation',
    'icon', '📚'
  )
)
WHERE slug = 'leadsy-temp';