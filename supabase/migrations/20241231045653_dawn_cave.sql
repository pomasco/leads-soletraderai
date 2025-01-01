/*
  # Add slug column to agents table
  
  1. New Columns
    - `slug` (text, unique) - URL-friendly version of agent name
  
  2. Changes
    - Add unique constraint on slug
    - Add index for faster lookups
    - Update existing agents with slugs
*/

-- Add slug column
ALTER TABLE public.agents 
ADD COLUMN slug text UNIQUE;

-- Create index for slug lookups
CREATE INDEX agents_slug_idx ON public.agents (slug);

-- Update existing agents with slugs
UPDATE public.agents
SET slug = lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL;

-- Make slug required for future inserts
ALTER TABLE public.agents
ALTER COLUMN slug SET NOT NULL;