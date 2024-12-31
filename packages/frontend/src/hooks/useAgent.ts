import { useMemo } from 'react';
import agentConfig from '../config/agents.json';

export interface Agent {
  id: string;
  name: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  credit_cost: number;
  features: string[];
  capabilities: string[];
  metadata: {
    version: string;
    lastUpdated: string;
    requirements: {
      minCredits: number;
      maxResults: number;
    };
  };
}

export function useAgent(agentId: string) {
  const agent = useMemo(() => {
    return agentConfig.agents.find(a => a.id === agentId);
  }, [agentId]);

  return agent;
}