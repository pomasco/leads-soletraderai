/*
  # Update Agents Schema

  1. New Fields
    - Added fields for enhanced agent information:
      - developer (text)
      - avatar (text)
      - title (text)
      - short_description (text)
      - long_description (text)
      - categories (text[])
      - tags (text[])
      - capabilities (text[])
      - features (text[])
      - services (jsonb)
      - process (jsonb)
      - tutorials (jsonb)
      - test_agent (jsonb)
      - main_agent (jsonb)
      - compliance (jsonb)
      - reviews (jsonb)
      - metrics (jsonb)
      - metadata (jsonb)

  2. Changes
    - Added new columns to agents table
    - Added indexes for improved query performance
    - Updated existing Leadsy agent with new fields
*/

-- Add new columns to agents table
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS developer text;
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS avatar text;
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS short_description text;
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS long_description text;
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS categories text[] DEFAULT '{}';
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS capabilities text[] DEFAULT '{}';
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS features text[] DEFAULT '{}';
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS services jsonb DEFAULT '[]';
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS process jsonb DEFAULT '[]';
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS tutorials jsonb DEFAULT '[]';
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS test_agent jsonb DEFAULT '{}';
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS main_agent jsonb DEFAULT '{}';
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS compliance jsonb DEFAULT '[]';
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS reviews jsonb DEFAULT '[]';
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS metrics jsonb DEFAULT '{}';
ALTER TABLE public.agents ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}';

-- Add indexes for improved query performance
CREATE INDEX IF NOT EXISTS agents_categories_idx ON public.agents USING GIN (categories);
CREATE INDEX IF NOT EXISTS agents_tags_idx ON public.agents USING GIN (tags);
CREATE INDEX IF NOT EXISTS agents_capabilities_idx ON public.agents USING GIN (capabilities);

-- Update Leadsy agent with new fields
UPDATE public.agents
SET
  developer = 'Sole Trader AI',
  avatar = 'https://imgur.com/qI6XgOo',
  title = 'Lead Generation Specialist',
  short_description = 'Generate high-quality leads from Google Maps with smart filtering and validation.',
  long_description = 'Generate high-quality leads from Google Maps with smart filtering and validation. But in a longer format.',
  categories = ARRAY['lead_generation', 'data_extraction'],
  tags = ARRAY['leads', 'google_maps', 'data_validation'],
  capabilities = ARRAY['location_targeting', 'contact_info', 'industry_search'],
  features = ARRAY[
    'Advanced Google Maps Integration',
    'Smart Lead Filtering',
    'Data Validation & Enrichment',
    'CSV Export Functionality',
    'Real-time Progress Tracking'
  ],
  services = '[
    {
      "title": "Lead Generation",
      "description": "Automated lead generation from Google Maps with smart filtering.",
      "features": [
        "Business contact information",
        "Location-based targeting",
        "Industry-specific searches"
      ]
    },
    {
      "title": "Data Validation",
      "description": "Ensure accuracy with our advanced validation system.",
      "features": [
        "Email verification",
        "Phone number validation",
        "Address confirmation"
      ]
    },
    {
      "title": "Export & Integration",
      "description": "Seamlessly export and integrate your leads.",
      "features": [
        "CSV export",
        "CRM integration",
        "API access"
      ]
    }
  ]'::jsonb,
  metadata = '{
    "version": "1.0.0",
    "lastUpdated": "2024-03-20",
    "requirements": {
      "minCredits": 100,
      "maxResults": 1000
    },
    "pricing": {
      "creditCost": 1,
      "bulkDiscounts": [
        {
          "credits": 1000,
          "discount": 10
        },
        {
          "credits": 5000,
          "discount": 20
        }
      ]
    }
  }'::jsonb
WHERE id = 'leadsy';