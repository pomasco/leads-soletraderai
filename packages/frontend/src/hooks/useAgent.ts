import { useState, useEffect } from 'react';
import { getAgentBySlug } from '../lib/api/agents';
import type { Agent } from '../types/agents';

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
        const data = await getAgentBySlug(slug);
        
        if (!data) {
          throw new Error('Agent not found');
        }
        
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