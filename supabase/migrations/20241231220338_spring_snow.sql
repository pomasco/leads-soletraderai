/*
  # Add developer and avatar fields to agents table

  1. New Columns
    - `developer` (text): The developer/company that created the agent
    - `avatar` (text): URL to the agent's avatar image

  2. Updates
    - Add columns if they don't exist
    - Update existing agents with new field values
*/

-- Add new columns if they don't exist
ALTER TABLE public.agents 
ADD COLUMN IF NOT EXISTS developer text,
ADD COLUMN IF NOT EXISTS avatar text;

-- Update existing agents with developer and avatar fields
UPDATE public.agents
SET
  developer = 'Sole Trader AI',
  avatar = 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=300'
WHERE developer IS NULL;