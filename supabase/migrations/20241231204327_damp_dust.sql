/*
  # Add Template Agent
  
  1. New Data
    - Adds the leadsy-temp agent as a template reference
    - Includes all required fields and metadata
  
  2. Changes
    - Inserts new agent record
    - Ensures all required fields are populated
*/

-- Insert template agent
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
  category,
  developer,
  avatar
) VALUES (
  'leadsy-temp',
  'Leadsy (Template)',
  'Lead Generation Template',
  'Template version of Leadsy with standardized layout and components.',
  'Template version of Leadsy with standardized layout and components.',
  'A comprehensive template showcasing the standard layout and components used across our AI agents. Use this as a reference for creating new agent pages and understanding our design system.',
  ARRAY[
    'Standard Layout Structure',
    'Reusable Components',
    'Consistent Styling',
    'Best Practices',
    'Documentation'
  ],
  'layout-template',
  0,
  'template',
  'Sole Trader AI',
  'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=300'
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
  category = EXCLUDED.category,
  developer = EXCLUDED.developer,
  avatar = EXCLUDED.avatar;