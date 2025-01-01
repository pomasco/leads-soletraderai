import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Agent {
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string;
  short_description: string;
  long_description: string;
  features: string[];
  icon: string;
  credit_cost: number;
  category: string;
}

export function useAgent(slug: string) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    const fetchAgent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { data, error: fetchError } = await supabase
          .from('agents')
          .select(`
            id,
            slug,
            name,
            title,
            description,
            short_description,
            long_description,
            features,
            icon,
            credit_cost,
            category
          `)
          .eq('slug', slug)
          .single();

        if (fetchError) throw fetchError;
        if (!data) throw new Error('Agent not found');
        
        setAgent(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch agent'));
        setAgent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [slug]);

  return { 
    agent, 
    loading, 
    error,
    isLoading: loading,
    isError: !!error 
  };
}