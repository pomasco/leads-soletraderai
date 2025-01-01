import { supabase } from '../supabase';
import type { Agent } from '@/types/agents';

export async function getAgentBySlug(slug: string): Promise<Agent | null> {
  const { data, error } = await supabase
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
      categories,
      tags,
      developer,
      avatar,
      services
    `)
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    throw new Error(`Failed to fetch agent: ${error.message}`);
  }

  return data;
}