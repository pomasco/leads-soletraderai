-- Insert form configuration for template agent
INSERT INTO public.agent_forms (agent_id, form_type, config)
SELECT 
    id,
    'scraping',
    jsonb_build_object(
        'fields', jsonb_build_array(
            jsonb_build_object(
                'type', 'keywords',
                'label', 'Template Keywords',
                'description', 'Enter keywords to demonstrate the template form functionality',
                'required', true,
                'maxItems', 5
            ),
            jsonb_build_object(
                'type', 'location',
                'label', 'Template Location',
                'description', 'Select a location to demonstrate the template form functionality',
                'required', true
            ),
            jsonb_build_object(
                'type', 'results',
                'label', 'Sample Results',
                'description', 'Select the number of sample results',
                'required', true,
                'min', 10,
                'max', 100,
                'step', 10
            )
        ),
        'validation', jsonb_build_object(
            'minKeywords', 1,
            'maxKeywords', 5,
            'minResults', 10,
            'maxResults', 100
        ),
        'metadata', jsonb_build_object(
            'version', '1.0.0',
            'lastUpdated', now(),
            'isTemplate', true
        )
    )
FROM public.agents
WHERE slug = 'leadsy-temp'
ON CONFLICT DO NOTHING;