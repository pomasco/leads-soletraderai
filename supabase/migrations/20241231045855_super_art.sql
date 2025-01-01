/*
  # Add agent slug for URL-friendly routing

  1. Changes
    - Add slug column to agents table
    - Create index for slug lookups
    - Update existing agents with slugs
    - Make slug required for future inserts

  2. Security
    - No changes to RLS policies needed
*/

-- Add slug column
ALTER TABLE public.agents 
ADD COLUMN IF NOT EXISTS slug text UNIQUE;

-- Create index for slug lookups
CREATE INDEX IF NOT EXISTS agents_slug_idx ON public.agents (slug);

-- Update existing agents with slugs
UPDATE public.agents
SET slug = lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL;

-- Make slug required for future inserts
ALTER TABLE public.agents
ALTER COLUMN slug SET NOT NULL;