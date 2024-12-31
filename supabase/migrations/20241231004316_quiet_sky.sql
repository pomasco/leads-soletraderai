/*
  # Update Agents Table Schema

  1. Changes
    - Rename test_agent to test_agent_form
    - Rename main_agent to main_agent_form
    - Change id to UUID with auto-generation

  2. Data Migration
    - Preserves existing data
    - Generates new UUIDs for existing records
*/

-- Rename columns
ALTER TABLE public.agents 
  RENAME COLUMN test_agent TO test_agent_form;

ALTER TABLE public.agents 
  RENAME COLUMN main_agent TO main_agent_form;

-- Add temporary UUID column
ALTER TABLE public.agents 
  ADD COLUMN new_id uuid DEFAULT uuid_generate_v4();

-- Copy existing data to preserve relationships
UPDATE public.agents 
SET new_id = uuid_generate_v4();

-- Update foreign key references in user_agents table
ALTER TABLE public.user_agents 
  ADD COLUMN new_agent_id uuid;

UPDATE public.user_agents ua
SET new_agent_id = a.new_id
FROM public.agents a
WHERE ua.agent_id = a.id;

-- Drop old foreign key constraint
ALTER TABLE public.user_agents 
  DROP CONSTRAINT user_agents_agent_id_fkey;

-- Drop old primary key constraint
ALTER TABLE public.agents 
  DROP CONSTRAINT agents_pkey;

-- Remove old id column
ALTER TABLE public.agents 
  DROP COLUMN id;

-- Rename new_id to id
ALTER TABLE public.agents 
  RENAME COLUMN new_id TO id;

-- Add primary key constraint
ALTER TABLE public.agents 
  ADD PRIMARY KEY (id);

-- Update user_agents table
ALTER TABLE public.user_agents 
  DROP COLUMN agent_id;

ALTER TABLE public.user_agents 
  RENAME COLUMN new_agent_id TO agent_id;

ALTER TABLE public.user_agents 
  ADD CONSTRAINT user_agents_agent_id_fkey 
  FOREIGN KEY (agent_id) 
  REFERENCES public.agents(id) 
  ON DELETE CASCADE;