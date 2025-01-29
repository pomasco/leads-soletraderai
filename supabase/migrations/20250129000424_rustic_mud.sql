/*
  # Add Agent Forms Schema

  1. New Tables
    - `agent_forms` - Stores form configurations for each agent
      - `id` (uuid, primary key)
      - `agent_id` (uuid, references agents)
      - `form_type` (text) - Type of form (e.g., 'scraping', 'test')
      - `config` (jsonb) - Form configuration
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `agent_forms` table
    - Add policies for authenticated users to read forms
*/

-- Create agent_forms table
CREATE TABLE IF NOT EXISTS public.agent_forms (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    agent_id uuid REFERENCES agents(id) ON DELETE CASCADE,
    form_type text NOT NULL,
    config jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.agent_forms ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Agent forms are viewable by authenticated users"
    ON public.agent_forms
    FOR SELECT
    TO authenticated
    USING (true);

-- Create update trigger for updated_at
CREATE TRIGGER update_agent_forms_updated_at
    BEFORE UPDATE ON public.agent_forms
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert test data for Leadsy's scraping form
INSERT INTO public.agent_forms (agent_id, form_type, config)
SELECT 
    id,
    'scraping',
    jsonb_build_object(
        'fields', jsonb_build_array(
            jsonb_build_object(
                'type', 'keywords',
                'label', 'Keywords',
                'description', 'Enter up to 5 keywords that define the businesses you want to target',
                'required', true,
                'maxItems', 5
            ),
            jsonb_build_object(
                'type', 'location',
                'label', 'Location',
                'description', 'Select the target location for your search',
                'required', true
            ),
            jsonb_build_object(
                'type', 'results',
                'label', 'Number of Results',
                'description', 'How many results do you need?',
                'required', true,
                'min', 100,
                'max', 1000,
                'step', 100
            )
        ),
        'validation', jsonb_build_object(
            'minKeywords', 1,
            'maxKeywords', 5,
            'minResults', 100,
            'maxResults', 1000
        ),
        'metadata', jsonb_build_object(
            'version', '1.0.0',
            'lastUpdated', now()
        )
    )
FROM public.agents
WHERE slug = 'leadsy'
ON CONFLICT DO NOTHING;