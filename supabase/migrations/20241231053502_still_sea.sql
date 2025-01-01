/*
  # Fix Agent Structure and Data

  1. Changes
    - Ensure correct column structure
    - Update Leadsy agent data
    - Add proper indexes
  
  2. Security
    - Maintain existing RLS policies
*/

-- Ensure all required columns exist
ALTER TABLE public.agents 
ADD COLUMN IF NOT EXISTS slug text,
ADD COLUMN IF NOT EXISTS title text,
ADD COLUMN IF NOT EXISTS short_description text,
ADD COLUMN IF NOT EXISTS long_description text,
ADD COLUMN IF NOT EXISTS features text[] DEFAULT '{}';

-- Drop existing slug constraint if it exists
ALTER TABLE public.agents 
DROP CONSTRAINT IF EXISTS agents_slug_key;

-- Add unique constraint for slug
ALTER TABLE public.agents 
ADD CONSTRAINT agents_slug_key UNIQUE (slug);

-- Create index for slug lookups
DROP INDEX IF EXISTS agents_slug_idx;
CREATE INDEX agents_slug_idx ON public.agents (slug);

-- Update Leadsy agent
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
  category
) VALUES (
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
  'lead_generation'
) ON CONFLICT (slug) DO UPDATE 
SET 
  name = EXCLUDED.name,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  short_description = EXCLUDED.short_description,
  long_description = EXCLUDED.long_description,
  features = EXCLUDED.features,
  icon = EXCLUDED.icon,
  credit_cost = EXCLUDED.credit_cost,
  category = EXCLUDED.category;