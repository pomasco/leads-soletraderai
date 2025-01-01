/*
  # Fix Agent Navigation and Structure

  1. Changes
    - Add slug column for URL-friendly identifiers
    - Add missing columns for agent data
    - Update existing agent data
    - Add proper indexes
  
  2. Security
    - Maintain existing RLS policies
    - Add validation for slugs
*/

-- Add slug column if it doesn't exist
ALTER TABLE public.agents 
ADD COLUMN IF NOT EXISTS slug text UNIQUE;

-- Create function to generate clean slugs
CREATE OR REPLACE FUNCTION generate_clean_slug(name text) 
RETURNS text AS $$
BEGIN
  RETURN lower(regexp_replace(
    regexp_replace(name, '[^a-zA-Z0-9\s-]', '', 'g'), -- Remove special chars
    '\s+', '-', 'g' -- Replace spaces with hyphens
  ));
END;
$$ LANGUAGE plpgsql;

-- Update existing agents with slugs
UPDATE public.agents
SET slug = generate_clean_slug(name)
WHERE slug IS NULL;

-- Make slug required for future inserts
ALTER TABLE public.agents
ALTER COLUMN slug SET NOT NULL;

-- Create index for slug lookups
CREATE INDEX IF NOT EXISTS agents_slug_idx ON public.agents (slug);

-- Insert or update Leadsy agent
INSERT INTO public.agents (
  id,
  name,
  slug,
  description,
  title,
  short_description,
  long_description,
  features,
  icon,
  credit_cost,
  category
) VALUES (
  'leadsy',
  'Leadsy',
  'leadsy',
  'Generate high-quality leads from Google Maps with smart filtering and validation.',
  'Lead Generation Specialist',
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
) ON CONFLICT (id) DO UPDATE 
SET 
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  title = EXCLUDED.title,
  short_description = EXCLUDED.short_description,
  long_description = EXCLUDED.long_description,
  features = EXCLUDED.features,
  icon = EXCLUDED.icon,
  credit_cost = EXCLUDED.credit_cost,
  category = EXCLUDED.category;

-- Add trigger to automatically generate slugs
CREATE OR REPLACE FUNCTION auto_generate_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL THEN
    NEW.slug := generate_clean_slug(NEW.name);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ensure_agent_slug
  BEFORE INSERT OR UPDATE ON public.agents
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_slug();