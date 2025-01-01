/*
  # Fix Agent Navigation and Structure

  1. Changes
    - Add missing columns for agent data
    - Update existing agent data
    - Add proper indexes
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add missing columns if they don't exist
ALTER TABLE public.agents 
ADD COLUMN IF NOT EXISTS slug text UNIQUE,
ADD COLUMN IF NOT EXISTS title text,
ADD COLUMN IF NOT EXISTS short_description text,
ADD COLUMN IF NOT EXISTS long_description text,
ADD COLUMN IF NOT EXISTS features text[] DEFAULT '{}';

-- Create index for slug lookups if it doesn't exist
CREATE INDEX IF NOT EXISTS agents_slug_idx ON public.agents (slug);

-- Update Leadsy agent
UPDATE public.agents
SET
  slug = 'leadsy',
  title = 'Lead Generation Specialist',
  short_description = 'Generate high-quality leads from Google Maps with smart filtering and validation.',
  long_description = 'Transform your lead generation process with Leadsy, our advanced AI agent that seamlessly integrates with Google Maps to discover and validate potential business leads.',
  features = ARRAY[
    'Advanced Google Maps Integration',
    'Smart Lead Filtering',
    'Data Validation & Enrichment',
    'CSV Export Functionality',
    'Real-time Progress Tracking'
  ]
WHERE id = 'leadsy';